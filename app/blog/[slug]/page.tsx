import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Clock, Tag, Calendar } from 'lucide-react';
import { getAllPostSlugs, getPostBySlug } from '@/lib/blog';
import BlogContent from '@/components/BlogContent';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  if (!post) return { title: 'Post Not Found' };

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author ?? 'Maverick Digitals'],
      tags: post.tags,
      images: post.cover
        ? [{ url: post.cover, width: 1200, height: 630, alt: post.title }]
        : [{ url: '/og-image.png', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.cover ?? '/og-image.png'],
    },
  };
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default function BlogPostPage({ params }: Props) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const allSlugs = getAllPostSlugs();
  const currentIdx = allSlugs.indexOf(params.slug);
  const prevSlug = currentIdx < allSlugs.length - 1 ? allSlugs[currentIdx + 1] : null;
  const nextSlug = currentIdx > 0 ? allSlugs[currentIdx - 1] : null;
  const prevPost = prevSlug ? getPostBySlug(prevSlug) : null;
  const nextPost = nextSlug ? getPostBySlug(nextSlug) : null;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    author: { '@type': 'Organization', name: post.author ?? 'Maverick Digitals' },
    publisher: {
      '@type': 'Organization',
      name: 'Maverick Digitals',
      url: 'https://www.maverickdigitals.co.in',
    },
    datePublished: post.date,
    image: post.cover ?? '/og-image.png',
    url: `https://www.maverickdigitals.co.in/blog/${post.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="min-h-screen">
        {/* Back nav */}
        <div className="px-6 md:px-10 pt-32 md:pt-40 pb-12 border-b border-[var(--border)]">
          <div className="max-w-[1400px] mx-auto">
            <Link
              href="/blog"
              className="inline-flex items-center gap-3 label-sm opacity-50 hover:opacity-100 transition-opacity group"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
              Archive Protocol
            </Link>
          </div>
        </div>

        {/* Hero */}
        <header className="px-6 md:px-10 py-20 md:py-32 border-b border-[var(--border)]">
          <div className="max-w-[900px] mx-auto">
            <div className="flex flex-wrap items-center gap-6 mb-10">
              <span className="label-sm px-4 py-2 border border-[var(--border)] uppercase tracking-[0.2em]">
                {post.category}
              </span>
              <span className="label-sm opacity-50 flex items-center gap-2">
                <Calendar size={12} />
                {formatDate(post.date)}
              </span>
              <span className="label-sm opacity-50 flex items-center gap-2">
                <Clock size={12} />
                {post.readTime}
              </span>
            </div>

            <h1
              className="font-outfit font-black text-[var(--foreground)] uppercase leading-[0.88] tracking-tighter mb-10"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 6rem)' }}
            >
              {post.title}
            </h1>

            <p className="text-xl md:text-2xl text-[var(--muted-foreground)] leading-relaxed font-medium max-w-3xl">
              {post.excerpt}
            </p>

            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap items-center gap-3 mt-12">
                <Tag size={14} className="opacity-40" />
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="label-sm px-3 py-1 border border-[var(--border)] opacity-60 hover:opacity-100 transition-opacity"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </header>

        {/* Content */}
        <div className="px-6 md:px-10 py-20 md:py-32">
          <div className="max-w-[900px] mx-auto">
            <BlogContent content={post.content} />
          </div>
        </div>

        {/* Author strip */}
        <div className="px-6 md:px-10 py-16 border-t border-b border-[var(--border)] bg-[var(--surface)]">
          <div className="max-w-[900px] mx-auto flex items-center gap-6">
            <div className="w-16 h-16 rounded-full bg-[var(--brand-gradient)] flex items-center justify-center text-white font-black text-xl shrink-0">
              M
            </div>
            <div>
              <div className="label-sm opacity-50 mb-1">Written by</div>
              <div className="font-outfit font-black text-xl uppercase tracking-tighter">
                {post.author ?? 'Maverick Digitals'}
              </div>
              <div className="text-sm opacity-50 mt-1">
                Performance marketing agency — Mumbai, India
              </div>
            </div>
          </div>
        </div>

        {/* Prev / Next navigation */}
        {(prevPost || nextPost) && (
          <nav className="px-6 md:px-10 py-16 border-b border-[var(--border)]">
            <div className="max-w-[1400px] mx-auto grid md:grid-cols-2 gap-px bg-[var(--border)]">
              {prevPost ? (
                <Link
                  href={`/blog/${prevPost.slug}`}
                  className="group p-10 hover:bg-[var(--inverted-bg)] transition-colors duration-500 flex flex-col gap-4"
                >
                  <span className="label-sm opacity-50 group-hover:text-[var(--inverted-text)]">
                    ← Previous
                  </span>
                  <span className="font-outfit font-black text-2xl uppercase tracking-tighter leading-none group-hover:text-[var(--inverted-text)] line-clamp-2">
                    {prevPost.title}
                  </span>
                </Link>
              ) : (
                <div />
              )}
              {nextPost ? (
                <Link
                  href={`/blog/${nextPost.slug}`}
                  className="group p-10 hover:bg-[var(--inverted-bg)] transition-colors duration-500 flex flex-col gap-4 text-right"
                >
                  <span className="label-sm opacity-50 group-hover:text-[var(--inverted-text)]">
                    Next →
                  </span>
                  <span className="font-outfit font-black text-2xl uppercase tracking-tighter leading-none group-hover:text-[var(--inverted-text)] line-clamp-2">
                    {nextPost.title}
                  </span>
                </Link>
              ) : (
                <div />
              )}
            </div>
          </nav>
        )}

        {/* CTA */}
        <section className="px-6 md:px-10 py-32 md:py-48 text-center bg-[var(--inverted-bg)] text-[var(--inverted-text)]">
          <div className="max-w-3xl mx-auto">
            <span className="label-sm block mb-12 opacity-50">Ready to Scale?</span>
            <h2
              className="font-outfit font-black uppercase tracking-tighter leading-none mb-16"
              style={{ fontSize: 'clamp(3rem, 8vw, 8rem)' }}
            >
              Let&apos;s Build
              <br />
              Revenue.
            </h2>
            <Link
              href="/contact"
              className="inline-flex items-center gap-4 border-2 border-[var(--inverted-text)] px-10 py-5 font-outfit font-black uppercase tracking-widest hover:bg-[var(--inverted-text)] hover:text-[var(--inverted-bg)] transition-colors duration-300 text-lg"
            >
              Start a Conversation
              <ArrowLeft size={18} className="rotate-180" />
            </Link>
          </div>
        </section>
      </article>
    </>
  );
}
