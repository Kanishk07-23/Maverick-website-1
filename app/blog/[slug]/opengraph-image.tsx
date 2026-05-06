import { ImageResponse } from 'next/og';
import { getAllPostSlugs } from '@/lib/blog';

// Node runtime so we can use fs via lib/blog
export const runtime = 'nodejs';
export const contentType = 'image/png';
export const size = { width: 1200, height: 630 };

export default async function Image({ params }: { params: { slug: string } }) {
  // Dynamic import so Next.js doesn't attempt to bundle fs into edge chunks
  const { getPostBySlug } = await import('@/lib/blog');
  const post = getPostBySlug(params.slug);

  const title = post?.title ?? 'Maverick Digitals';
  const category = post?.category ?? 'Blog';

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: '100%',
          height: '100%',
          padding: '80px',
          backgroundColor: '#0a0a0a',
          color: '#fafafa',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Top bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div
            style={{
              fontSize: 14,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              opacity: 0.5,
              border: '1px solid rgba(255,255,255,0.2)',
              padding: '8px 16px',
            }}
          >
            {category}
          </div>
          <div
            style={{
              fontSize: 14,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              opacity: 0.5,
            }}
          >
            maverickdigitals.co.in
          </div>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: title.length > 50 ? 52 : 68,
            fontWeight: 900,
            textTransform: 'uppercase',
            letterSpacing: '-0.04em',
            lineHeight: 0.92,
            maxWidth: '90%',
          }}
        >
          {title}
        </div>

        {/* Bottom bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #7c3aed, #3b82f6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 22,
                fontWeight: 900,
                color: '#fff',
              }}
            >
              M
            </div>
            <div>
              <div
                style={{
                  fontSize: 18,
                  fontWeight: 900,
                  textTransform: 'uppercase',
                  letterSpacing: '-0.02em',
                }}
              >
                Maverick Digitals
              </div>
              <div
                style={{
                  fontSize: 12,
                  opacity: 0.4,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                }}
              >
                Turn Attention Into Revenue
              </div>
            </div>
          </div>
          <div
            style={{
              width: 200,
              height: 4,
              background: 'linear-gradient(90deg, #7c3aed, #3b82f6, #06b6d4)',
              borderRadius: 2,
            }}
          />
        </div>
      </div>
    ),
    { ...size }
  );
}
