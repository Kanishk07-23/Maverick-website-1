import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Blog & Insights',
  description:
    'Marketing insights, growth strategies, and digital trends from the Maverick Digitals team. Built for ambitious brands looking to scale.',
};

// =============================================
// ADMIN: ADD BLOG POSTS HERE
// Each post: { id, slug, title, excerpt, category, date, readTime, cover? }
// =============================================
const POSTS: Array<{
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  cover?: string;
}> = [
  // Example (uncomment to use):
  // {
  //   id: '1',
  //   slug: 'how-to-build-personal-brand-2025',
  //   title: 'How to Build a Powerful Personal Brand in 2025',
  //   excerpt: 'A step-by-step guide to positioning yourself as the #1 authority in your industry...',
  //   category: 'Personal Branding',
  //   date: '2025-04-01',
  //   readTime: '8 min read',
  //   cover: '/images/blog-personal-brand.jpg',
  // },
];
// =============================================

const categories = ['All', 'Performance Marketing', 'SEO', 'Social Media', 'Personal Branding', 'Web Dev', 'Strategy'];

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default function BlogPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="section-padding mesh-gradient">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest text-purple-400 glass-card border border-purple-500/20 mb-6">
              Insights
            </span>
            <h1 className="font-outfit font-bold text-foreground mb-6"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)' }}>
              Marketing That{' '}
              <span className="gradient-text">Moves Brands</span>
            </h1>
            <p className="text-muted-foreground text-xl leading-relaxed">
              Deep-dive articles, strategies, and actionable insights from the Maverick Digitals team.
              Built for founders and marketers serious about scaling.
            </p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 border-b border-border">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              className="px-4 py-1.5 rounded-full text-sm text-muted-foreground glass-card border border-border hover:border-purple-500/40 hover:text-foreground transition-all"
              id={`blog-cat-${cat.toLowerCase().replace(/\s/g, '-')}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Posts */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          {POSTS.length === 0 ? (
            /* Empty state */
            <div className="text-center py-20">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{ background: 'rgba(124,58,237,0.12)' }}>
                <span className="text-3xl font-outfit font-bold text-purple-400">...</span>
              </div>
              <h2 className="font-outfit font-bold text-foreground text-2xl mb-3">Coming Soon</h2>
              <p className="text-muted-foreground max-w-sm mx-auto text-sm">
                Our team is working on insightful articles about digital marketing, growth strategy, and brand building.
                Check back soon — or subscribe to be first in line.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center items-center">
                <form className="flex gap-2" id="blog-notify-form">
                  <input
                    type="email"
                    placeholder="your@email.com"
                    id="blog-notify-email"
                    className="form-input w-64"
                  />
                  <button type="submit" id="blog-notify-submit"
                    className="px-5 py-3 rounded-xl text-sm font-semibold text-foreground flex-shrink-0"
                    style={{ background: 'var(--gradient-brand)' }}>
                    Notify Me
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {POSTS.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`} id={`blog-post-${post.id}`}>
                  <article className="glass-card rounded-2xl overflow-hidden border border-border hover:border-purple-500/30 transition-all duration-300 hover:scale-[1.02] group h-full flex flex-col">
                    {/* Cover */}
                    <div className="h-48 relative overflow-hidden"
                      style={{ background: 'var(--gradient-brand)', opacity: 0.7 }}>
                      {post.cover && (
                        <img src={post.cover} alt={post.title}
                          className="w-full h-full object-cover" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs px-2.5 py-1 rounded-full text-purple-400 border border-purple-500/20 glass-card">
                          {post.category}
                        </span>
                        <span className="flex items-center gap-1 text-muted-foreground text-xs">
                          <Clock size={11} /> {post.readTime}
                        </span>
                      </div>

                      <h2 className="text-foreground font-outfit font-bold text-lg mb-2 group-hover:text-purple-200 transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-muted-foreground text-sm leading-relaxed flex-1">{post.excerpt}</p>

                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                        <span className="text-muted-foreground text-xs">{formatDate(post.date)}</span>
                        <span className="flex items-center gap-1 text-purple-400 text-xs font-medium">
                          Read more <ArrowRight size={12} />
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      {POSTS.length > 0 && (
        <section className="py-20 text-center">
          <div className="max-w-xl mx-auto px-6">
            <h2 className="font-outfit font-bold text-foreground text-3xl mb-4">
              Get Insights <span className="gradient-text">In Your Inbox</span>
            </h2>
            <p className="text-muted-foreground mb-6 text-sm">
              No spam. Just practical marketing strategies, once a week.
            </p>
            <form className="flex gap-3" id="blog-subscribe-form">
              <input type="email" placeholder="your@email.com" id="blog-subscribe-email"
                className="form-input flex-1" />
              <button type="submit" id="blog-subscribe-submit"
                className="px-6 py-3 rounded-xl font-semibold text-foreground flex-shrink-0"
                style={{ background: 'var(--gradient-brand)' }}>
                Subscribe
              </button>
            </form>
          </div>
        </section>
      )}
    </div>
  );
}
