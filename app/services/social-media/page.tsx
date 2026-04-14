import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Social Media Management Agency Mumbai | Maverick Digitals',
  description: 'Top social media marketing agency in Mumbai. We turn your social platforms into revenue-generating engines with high-quality content and community management.',
  keywords: ['social media management agency', 'social media marketing mumbai', 'content creation', 'community management', 'instagram marketing mumbai', 'SMM agency India'],
};

const faqs = [
  {
    q: 'Why do I need a social media management agency?',
    a: 'Managing social media effectively requires consistent content creation, trend monitoring, and active community engagement—a full-time job. A specialized agency brings a team of strategists, copywriters, and designers to ensure your brand remains relevant and grows steadily, allowing you to focus on your core business.'
  },
  {
    q: 'Which platforms will you manage for my brand?',
    a: 'We tailor our platform strategy based on where your target audience spends their time. Our core expertise spans Instagram, LinkedIn, Facebook, X (Twitter), and YouTube. For most B2B clients, we focus heavily on LinkedIn, while B2C and E-commerce brands see the highest engagement on Instagram and Facebook.'
  },
  {
    q: 'Do you create original content or just repurpose existing assets?',
    a: 'Both. We maximize the ROI of your existing assets (like podcasts, webinars, or long-form blogs) by repurposing them into bite-sized social content. However, the core of our strategy relies on creating original, high-quality graphics, carousels, and short-form videos tailored specifically to your brand voice.'
  },
  {
    q: 'How do you measure social media success?',
    a: 'We track success beyond vanity metrics (like followers and likes). Our monthly performance reports focus on engagement rate, reach, website click-throughs, and ultimately, how social media contributes to your lead generation and sales pipeline.'
  }
];

export default function SocialMediaPage() {
  return (
    <div className="pt-20">
      <section className="section-padding mesh-gradient relative overflow-hidden" aria-label="Social Media Service Hero">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest text-[#6D28D9] glass-card border border-[#6D28D9]/20 mb-6">
              Social Media Strategy
            </span>
            <h1 className="font-grotesk font-bold text-white mb-6" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}>
              Top <span className="gradient-text">Social Media Management</span> Agency in Mumbai
            </h1>
            <p className="text-white/60 text-xl leading-relaxed mb-8">
              Stop guessing what to post. We build and execute data-driven social media strategies that turn passive scrollers into active, loyal customers. Done-for-you growth across all major platforms.
            </p>
            <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-white transition-all duration-300 hover:scale-105" style={{ background: 'var(--gradient-brand)' }}>
              Discuss Your Growth Plan <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="font-grotesk font-bold text-white text-3xl mb-6">Why Partner With a Social Media Marketing Agency?</h2>
              <article className="prose prose-invert max-w-none text-white/60">
                <p className="text-lg leading-relaxed mb-6">
                  In today's crowded digital landscape, simply having a social media profile is not enough. You need consistent, strategic, and high-quality storytelling that captures attention and drives action. 
                </p>
                <p className="leading-relaxed mb-6">
                  <strong>Social Media Management</strong> encompasses everything from audience research and content calendar creation to graphic design, copywriting, and active community engagement. It is the engine that drives your brand's digital presence and top-of-funnel awareness.
                </p>
                <p className="leading-relaxed">
                  As a leading <strong>social media marketing agency in Mumbai</strong>, Maverick Digitals takes a holistic approach. We don't just post for the sake of posting; we align your social media output directly with your overarching business objectives, ensuring every post has a purpose.
                </p>
              </article>
            </div>
            <div className="glass-card rounded-3xl p-8 border border-white/8">
              <h3 className="text-xl font-bold text-white mb-6">Our SMM Deliverables</h3>
              <ul className="flex flex-col gap-4">
                {[
                  'Comprehensive Social Strategy & Audit',
                  'Original Content Creation (Graphics & Video)',
                  'Monthly Content Calendar & Copywriting',
                  'Proactive Community Management',
                  'Trend Monitoring & Viral Strategy',
                  'Detailed Monthly Analytics & Reporting'
                ].map(item => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="text-[#6D28D9] flex-shrink-0 mt-0.5" />
                    <span className="text-white/80">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-[#0F0F23]/50" id="faq">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-grotesk font-bold text-white text-3xl mb-4">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>
          </div>
          <div className="flex flex-col gap-4">
            {faqs.map((faq, i) => (
              <details key={i} className="glass-card rounded-2xl border border-white/8 group overflow-hidden">
                <summary className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 cursor-pointer font-medium text-white select-none">
                  {faq.q}
                  <span className="text-purple-400 group-open:rotate-45 transition-transform duration-300 text-2xl leading-none">+</span>
                </summary>
                <div className="px-6 pb-5 text-white/60 text-sm leading-relaxed border-t border-white/5 pt-4">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify([
          {
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: 'Social Media Management',
            provider: {
              '@type': 'Organization',
              name: 'Maverick Digitals',
              url: 'https://www.maverickdigitals.co.in'
            },
            areaServed: ['India', 'USA', 'UAE', 'UK', 'Australia'],
            offers: {
              '@type': 'Offer',
              description: 'End-to-end social media marketing and community management.'
            }
          },
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map(f => ({
              '@type': 'Question',
              name: f.q,
              acceptedAnswer: { '@type': 'Answer', text: f.a },
            })),
          },
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.maverickdigitals.co.in/' },
              { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://www.maverickdigitals.co.in/services' },
              { '@type': 'ListItem', position: 3, name: 'Social Media Management', item: 'https://www.maverickdigitals.co.in/services/social-media' }
            ]
          }
        ])
      }} />
    </div>
  );
}
