import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getAllPosts } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Blog & Insights | Maverick Digitals',
  description:
    'Marketing insights, growth strategies, and digital trends from the Maverick Digitals team. Built for ambitious brands looking to scale.',
};

const categories = [
  'All',
  'Performance Marketing',
  'SEO',
  'Social Media',
  'Personal Branding',
  'Web Dev',
  'Strategy',
];

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative px-6 md:px-10 pt-40 pb-20 md:pt-56 md:pb-32 overflow-hidden border-b border-[var(--border)]">
        <div className="max-w-[1400px] mx-auto">
          <span className="label-sm block mb-10">[ Archive Protocol ]</span>
          <h1
            className="font-outfit font-black text-[var(--foreground)] uppercase leading-[0.85] mb-16 tracking-tighter"
            style={{ fontSize: 'clamp(3.5rem, 11vw, 12rem)' }}
          >
            Insights &<br />
            <span className="text-[var(--muted-foreground)]">Strategy.</span>
          </h1>
          <div className="max-w-2xl border-t border-[var(--border)] pt-12">
            <p className="text-[var(--muted-foreground)] text-xl md:text-2xl leading-relaxed font-medium">
              Deep-dive articles, growth blueprints, and category intel from the frontline of
              performance marketing.
            </p>
          </div>
        </div>
      </section>

      {/* Categories Bar */}
      <section className="py-8 border-b border-[var(--border)] overflow-x-auto whitespace-nowrap hide-scrollbar">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex gap-8">
          {categories.map((cat) => (
            <button
              key={cat}
              className="label-sm opacity-50 hover:opacity-100 transition-opacity uppercase tracking-[0.2em] relative group"
            >
              {cat}
              <div className="absolute -bottom-1 left-0 w-0 h-px bg-[var(--foreground)] group-hover:w-full transition-all duration-300" />
            </button>
          ))}
        </div>
      </section>

      {/* Posts */}
      <section className="py-24 md:py-40 px-6 md:px-10">
        <div className="max-w-[1400px] mx-auto">
          {posts.length === 0 ? (
            <div className="py-40 border border-dashed border-[var(--border)] flex flex-col items-center justify-center grayscale opacity-40">
              <div className="label-sm uppercase tracking-[0.2em] mb-4">
                Status: Transmission Pending
              </div>
              <h2 className="font-outfit font-black text-3xl uppercase tracking-tighter">
                Coming Soon to the Network
              </h2>
            </div>
          ) : (
            <>
              {/* Featured post — first article large */}
              <Link
                href={`/blog/${posts[0].slug}`}
                className="group block mb-px border border-[var(--border)] hover:bg-[var(--inverted-bg)] transition-colors duration-700 p-10 md:p-16 lg:p-20"
              >
                <div className="flex items-center justify-between mb-10">
                  <span className="label-sm px-4 py-2 border border-[var(--border)] uppercase tracking-[0.2em] group-hover:border-[var(--inverted-text)]/30 group-hover:text-[var(--inverted-text)]">
                    {posts[0].category}
                  </span>
                  <span className="label-sm opacity-50 group-hover:text-[var(--inverted-text)]">
                    {posts[0].readTime}
                  </span>
                </div>
                <h2
                  className="font-outfit font-black text-[var(--foreground)] uppercase tracking-tighter leading-[0.88] mb-10 group-hover:text-[var(--inverted-text)]"
                  style={{ fontSize: 'clamp(2.5rem, 6vw, 7rem)' }}
                >
                  {posts[0].title}
                </h2>
                <p className="text-xl opacity-70 mb-16 max-w-3xl group-hover:text-[var(--inverted-text)]">
                  {posts[0].excerpt}
                </p>
                <div className="flex items-center justify-between border-t border-[var(--border)] pt-8 group-hover:border-[var(--inverted-text)]/20">
                  <span className="label-sm opacity-50 group-hover:text-[var(--inverted-text)]">
                    {formatDate(posts[0].date)}
                  </span>
                  <div className="flex items-center gap-3 label-sm group-hover:text-[var(--inverted-text)]">
                    Read Article{' '}
                    <ArrowRight
                      size={16}
                      className="transform group-hover:translate-x-2 transition-transform duration-500"
                    />
                  </div>
                </div>
              </Link>

              {/* Remaining posts — grid */}
              {posts.length > 1 && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--border)] border border-[var(--border)] border-t-0">
                  {posts.slice(1).map((post) => (
                    <Link
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      className="group p-10 md:p-14 hover:bg-[var(--inverted-bg)] transition-colors duration-700 bg-[var(--background)]"
                    >
                      <div className="flex items-center justify-between mb-10">
                        <span className="label-sm opacity-50 uppercase tracking-[0.2em] group-hover:text-[var(--inverted-text)]">
                          {post.category}
                        </span>
                        <span className="label-sm opacity-50 group-hover:text-[var(--inverted-text)]">
                          {post.readTime}
                        </span>
                      </div>
                      <h2 className="font-outfit font-black text-3xl uppercase tracking-tighter leading-none mb-8 group-hover:text-[var(--inverted-text)]">
                        {post.title}
                      </h2>
                      <p className="text-lg opacity-70 mb-12 group-hover:text-[var(--inverted-text)]">
                        {post.excerpt}
                      </p>
                      <div className="mt-auto flex items-center justify-between border-t border-[var(--border)] pt-8 group-hover:border-[var(--inverted-text)]/20">
                        <span className="label-sm opacity-50 group-hover:text-[var(--inverted-text)]">
                          {formatDate(post.date)}
                        </span>
                        <ArrowRight
                          size={18}
                          className="transform group-hover:translate-x-2 transition-transform duration-500 group-hover:text-[var(--inverted-text)]"
                        />
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-32 md:py-48 px-6 md:px-10 border-t border-[var(--border)] text-center bg-[var(--inverted-bg)] text-[var(--inverted-text)]">
        <div className="max-w-3xl mx-auto">
          <span className="label-sm block mb-12 opacity-50">Intel Dispatch</span>
          <h2 className="font-outfit font-black text-5xl md:text-8xl uppercase tracking-tighter leading-none mb-16">
            Join the
            <br />
            Network.
          </h2>
          <form className="flex flex-col md:flex-row gap-4 max-w-xl mx-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 bg-transparent border-b-2 border-[var(--inverted-text)]/30 py-4 font-outfit font-black text-2xl uppercase tracking-tighter focus:outline-none focus:border-[var(--inverted-text)] text-[var(--inverted-text)] transition-colors placeholder:opacity-30"
            />
            <button
              type="submit"
              className="text-[var(--foreground)] px-10 py-5 font-bold uppercase tracking-widest hover:scale-105 transition-transform btn-magnetic bg-[var(--inverted-text)]"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
