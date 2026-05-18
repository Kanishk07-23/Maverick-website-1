'use client';
import { MessageSquare, Lightbulb, Rocket, BarChart2 } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { FeatureCard } from '@/components/ui/grid-feature-cards';

const features = [
	{
		title: 'Discovery & Strategy',
		icon: MessageSquare,
		description: 'We start with a deep-dive into your business, audience, and goals. No templates — just a custom growth blueprint built specifically for you.',
	},
	{
		title: 'Creative & Design',
		icon: Lightbulb,
		description: 'Our designers craft pixel-perfect visuals that convert. Every element is intentional — from colour psychology to micro-animations.',
	},
	{
		title: 'Build & Launch',
		icon: Rocket,
		description: 'Engineering-grade execution: blazing-fast, SEO-optimised, and fully accessible. We ship fast without cutting corners.',
	},
	{
		title: 'Optimise & Scale',
		icon: BarChart2,
		description: 'We don\'t disappear after launch. Ongoing analytics, A/B testing, and performance tuning keep your growth compounding.',
	}
];

export function ProcessSection() {
	return (
		<section className="py-16 md:py-32 relative z-10">
			<div className="mx-auto w-full max-w-5xl space-y-12 px-4">
				<AnimatedContainer className="mx-auto max-w-3xl text-center">
                    <p className="text-blue-600 font-bold text-sm uppercase tracking-widest mb-4">How We Work</p>
					<h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900">
						Our Proven <span className="brand-gradient-text">4-Step Process</span>
					</h2>
					<p className="text-gray-500 mt-6 text-base md:text-lg tracking-wide text-balance">
						A repeatable system fine-tuned over hundreds of client engagements.
					</p>
				</AnimatedContainer>

				<AnimatedContainer
					delay={0.4}
					className="grid grid-cols-1 divide-y divide-dashed border border-dashed border-gray-200 sm:grid-cols-2 md:grid-cols-2 sm:divide-x"
				>
					{features.map((feature, i) => (
						<FeatureCard key={i} feature={feature} />
					))}
				</AnimatedContainer>
			</div>
		</section>
	);
}

type ViewAnimationProps = {
	delay?: number;
	className?: string;
	children: React.ReactNode;
};

function AnimatedContainer({ className, delay = 0.1, children }: ViewAnimationProps) {
	const shouldReduceMotion = useReducedMotion();

	if (shouldReduceMotion) {
		return <div className={className}>{children}</div>;
	}

	return (
		<motion.div
			initial={{ filter: 'blur(4px)', translateY: -8, opacity: 0 }}
			whileInView={{ filter: 'blur(0px)', translateY: 0, opacity: 1 }}
			viewport={{ once: true }}
			transition={{ delay, duration: 0.8 }}
			className={className}
		>
			{children}
		</motion.div>
	);
}
