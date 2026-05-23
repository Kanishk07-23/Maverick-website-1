"use client";

import { ExpandableCard } from "@/components/ui/expandable-card";

const services = [
  {
    id: "personal-branding",
    title: "Personal Branding",
    description: "Identity & Authority",
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80&auto=format&fit=crop",
    content: (
      <>
        <h4>Build an Unforgettable Presence</h4>
        <p>
          Your personal brand is the story people tell about you when
          you're not in the room. We craft a cohesive identity — from
          your positioning statement to your visual language — that makes
          you the obvious choice in your market.
        </p>
        <h4>Authority That Converts</h4>
        <p>
          We combine strategic storytelling with consistent content
          execution to establish you as the go-to expert in your niche.
          Every touchpoint is designed to build trust and move your
          audience closer to working with you.
        </p>
        <h4>What's Included</h4>
        <p>
          Brand audit, positioning strategy, bio and messaging
          frameworks, content pillars, visual identity guidelines, and
          30-day content launch plan.
        </p>
      </>
    ),
  },
  {
    id: "social-media",
    title: "Social Media",
    description: "Engagement & Presence",
    src: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80&auto=format&fit=crop",
    content: (
      <>
        <h4>End-to-End Social Management</h4>
        <p>
          We handle every aspect of your social presence so you can
          focus on what you do best. From ideation to scheduling to
          community management — we're your dedicated social team.
        </p>
        <h4>Content That Stops the Scroll</h4>
        <p>
          Our creative team produces platform-native content engineered
          for reach and engagement. We study what works in your niche and
          iterate fast based on real data.
        </p>
        <h4>Platforms We Manage</h4>
        <p>
          Instagram, LinkedIn, X (Twitter), TikTok, YouTube Shorts, and
          Facebook. Each platform gets a tailored strategy based on your
          audience and goals.
        </p>
      </>
    ),
  },
  {
    id: "app-development",
    title: "App Development",
    description: "Engineering & Performance",
    src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80&auto=format&fit=crop",
    content: (
      <>
        <h4>Built to Scale From Day One</h4>
        <p>
          We engineer high-performance web and mobile applications using
          modern tech stacks — Next.js, React Native, Node.js, and more.
          Whether you're building an MVP or scaling an existing product,
          we architect for reliability and speed.
        </p>
        <h4>Design-Led Development</h4>
        <p>
          Every pixel matters. Our developers work hand-in-hand with
          designers to deliver interfaces that are as beautiful as they
          are fast. We don't separate design from engineering.
        </p>
        <h4>Our Process</h4>
        <p>
          Discovery → Wireframes → Design system → Development → QA →
          Launch → Ongoing support. We ship fast without cutting corners.
        </p>
      </>
    ),
  },
  {
    id: "seo-sem",
    title: "SEO & SEM",
    description: "Visibility & Growth",
    src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80&auto=format&fit=crop",
    content: (
      <>
        <h4>Own Your Search Results</h4>
        <p>
          We build sustainable organic traffic systems that compound over
          time. Technical SEO, content strategy, and link building
          combine to put you at the top of results that matter.
        </p>
        <h4>Paid Search That Pays Off</h4>
        <p>
          Our SEM campaigns are laser-targeted and meticulously
          optimised. We run Google Ads and Bing campaigns that bring
          high-intent buyers directly to your offer — not just traffic.
        </p>
        <h4>Reporting & Transparency</h4>
        <p>
          Weekly keyword ranking reports, monthly traffic reviews, and
          real-time ad dashboards. You always know exactly where your
          money is going and what it's producing.
        </p>
      </>
    ),
  },
  {
    id: "performance-ads",
    title: "Performance Ads",
    description: "Targeting & ROAS",
    src: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80&auto=format&fit=crop",
    content: (
      <>
        <h4>Every Rupee Tracked</h4>
        <p>
          We run paid campaigns across Meta, Google, and YouTube with
          obsessive attention to ROAS. No wasted spend, no guesswork —
          every campaign is built on data and optimised daily.
        </p>
        <h4>Creative That Converts</h4>
        <p>
          Great targeting means nothing without great creative. Our
          in-house team produces ad creatives — static, video, carousel
          — that stop the scroll and drive clicks that convert.
        </p>
        <h4>Full-Funnel Strategy</h4>
        <p>
          From awareness to retargeting to retention, we build ad
          ecosystems that work at every stage of your customer journey.
          We don't just run ads — we build revenue machines.
        </p>
      </>
    ),
  },
  {
    id: "brand-strategy",
    title: "Brand Strategy",
    description: "Foundation & Trust",
    src: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80&auto=format&fit=crop",
    content: (
      <>
        <h4>A Brand Is a Promise</h4>
        <p>
          We help you define your brand's promise and build every
          customer touchpoint around keeping it. From mission and values
          to messaging hierarchy and tone of voice — we build the
          foundation that everything else stands on.
        </p>
        <h4>Positioning That Wins Markets</h4>
        <p>
          We conduct deep competitive analysis and customer research to
          find the exact white space where your brand can own a category.
          Strategic differentiation isn't optional — it's survival.
        </p>
        <h4>Deliverables</h4>
        <p>
          Brand strategy deck, mission and vision statements, brand
          voice guidelines, messaging matrix, competitive landscape
          analysis, and a 90-day activation roadmap.
        </p>
      </>
    ),
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-[#fafaf9]">
      {/* Page header */}
      <div className="max-w-7xl mx-auto px-6 pt-32 pb-16">
        <p className="text-blue-600 font-bold text-sm uppercase tracking-widest mb-4">
          What We Do
        </p>
        <h1 className="text-5xl sm:text-6xl xl:text-7xl font-black tracking-tighter text-gray-900 leading-[1.02] mb-6">
          Our&nbsp;
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
            Expertise
          </span>
        </h1>
        <p className="text-gray-500 text-lg max-w-xl leading-relaxed">
          Six core capabilities, each designed to compound your growth. Click
          any card to explore the full service.
        </p>
      </div>

      {/* Card grid */}
      <div className="max-w-7xl mx-auto px-6 pb-32">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <ExpandableCard
              key={service.id}
              title={service.title}
              src={service.src}
              description={service.description}
              classNameExpanded="[&_h4]:text-gray-900 [&_h4]:font-bold [&_h4]:text-xl [&_h4]:mt-2"
            >
              {service.content}
            </ExpandableCard>
          ))}
        </div>
      </div>
    </div>
  );
}