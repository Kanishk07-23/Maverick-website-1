import { cn } from '@/lib/utils';
import React from 'react';

type FeatureType = {
	title: string;
	icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
	description: string;
};

type FeatureCardPorps = React.ComponentProps<'div'> & {
	feature: FeatureType;
	/** Pass a stable 0-based index so the pattern is deterministic on both server and client. */
	cardIndex?: number;
};

/**
 * Pre-defined static patterns — one per card slot.
 * Using Math.random() at render time causes SSR/client hydration mismatches
 * because the server and client each call it independently and get different results.
 */
const STATIC_PATTERNS: number[][][] = [
	[[7, 2], [9, 4], [8, 1], [10, 5], [7, 3]],
	[[8, 3], [10, 1], [9, 5], [7, 6], [8, 2]],
	[[9, 1], [7, 4], [10, 3], [8, 6], [9, 2]],
	[[10, 2], [8, 5], [7, 1], [9, 6], [10, 4]],
	[[7, 5], [9, 3], [8, 4], [10, 2], [7, 6]],
	[[8, 6], [10, 3], [7, 2], [9, 1], [8, 5]],
];

export function FeatureCard({ feature, cardIndex = 0, className, ...props }: FeatureCardPorps) {
	const p = STATIC_PATTERNS[cardIndex % STATIC_PATTERNS.length];

	return (
		<div className={cn('relative overflow-hidden p-6', className)} {...props}>
			<div className="pointer-events-none absolute top-0 left-1/2 -mt-2 -ml-20 h-full w-full [mask-image:linear-gradient(white,transparent)]">
				<div className="from-foreground/5 to-foreground/1 absolute inset-0 bg-gradient-to-r [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] opacity-100">
					<GridPattern
						width={20}
						height={20}
						x="-12"
						y="4"
						squares={p}
						className="fill-foreground/5 stroke-foreground/25 absolute inset-0 h-full w-full mix-blend-overlay"
					/>
				</div>
			</div>
			<feature.icon className="text-foreground/75 size-6" strokeWidth={1} aria-hidden />
			<h3 className="mt-10 text-sm md:text-base font-bold">{feature.title}</h3>
			<p className="text-muted-foreground relative z-20 mt-2 text-xs font-medium leading-relaxed">{feature.description}</p>
		</div>
	);
}

function GridPattern({
	width,
	height,
	x,
	y,
	squares,
	...props
}: React.ComponentProps<'svg'> & { width: number; height: number; x: string; y: string; squares?: number[][] }) {
	const patternId = React.useId();

	return (
		<svg aria-hidden="true" {...props}>
			<defs>
				<pattern id={patternId} width={width} height={height} patternUnits="userSpaceOnUse" x={x} y={y}>
					<path d={`M.5 ${height}V.5H${width}`} fill="none" />
				</pattern>
			</defs>
			<rect width="100%" height="100%" strokeWidth={0} fill={`url(#${patternId})`} />
			{squares && (
				<svg x={x} y={y} className="overflow-visible">
					{squares.map(([sqX, sqY], index) => (
						<rect strokeWidth="0" key={index} width={width + 1} height={height + 1} x={sqX * width} y={sqY * height} />
					))}
				</svg>
			)}
		</svg>
	);
}

// genRandomPattern removed — was causing SSR/client hydration mismatches.
// Replaced with STATIC_PATTERNS lookup above.
