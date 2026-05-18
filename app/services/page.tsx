"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";

/* Dynamic import — keeps 3D out of SSR */
const Service3DIcon = dynamic(
  () => import("@/components/ui/service-3d-icon").then((m) => m.Service3DIcon),
  { ssr: false, loading: () => <div className="w-full h-full" /> },
);

/* ─── Data ─────────────────────────────────────────────────── */
const services = [
  {
    id: 1,
    number: "01",
    title: "Personal Branding",
    tagline: "Build authority. Convert attention into revenue.",
    description:
      "We provide end-to-end support for founders and creators to scale their influence. From positioning and messaging to content strategy and distribution — we turn your story into a brand that earns trust at scale.",
    bullets: [
      "Positioning & messaging framework",
      "Content strategy & editorial calendar",
      "LinkedIn, Twitter & creator-platform growth",
      "Thought-leadership ghostwriting",
    ],
    accent: "#7c3aed",
    lightAccent: "rgba(124,58,237,0.08)",
    tag: "Influence",
  },
  {
    id: 2,
    number: "02",
    title: "Social Media Management",
    tagline: "Always-on social presence. Zero headaches.",
    description:
      "We handle your social presence end-to-end so you can focus on building your business. Our team researches trends, produces thumb-stopping content, and publishes on a cadence that keeps your audience engaged.",
    bullets: [
      "Multi-platform content production",
      "Community management & DM strategy",
      "Monthly analytics & growth reports",
      "Influencer & collab coordination",
    ],
    accent: "#2563eb",
    lightAccent: "rgba(37,99,235,0.08)",
    tag: "Growth",
  },
  {
    id: 3,
    number: "03",
    title: "Website & App Development",
    tagline: "Fast, beautiful, scalable digital products.",
    description:
      "We engineer high-performance platforms using modern tech stacks. Ensuring your digital presence is not only beautiful but also scalable and lightning-fast — driving conversions through superior UX.",
    bullets: [
      "Next.js & React web applications",
      "Mobile-first, accessible UI design",
      "CMS integration & headless commerce",
      "Core Web Vitals & performance optimisation",
    ],
    accent: "#0891b2",
    lightAccent: "rgba(8,145,178,0.08)",
    tag: "Tech",
  },
  {
    id: 4,
    number: "04",
    title: "SEO & SEM",
    tagline: "Own your search real estate.",
    description:
      "We build sustainable organic and paid search systems that compound over time. Making sure your brand is seen by high-intent users exactly when they're ready to buy.",
    bullets: [
      "Technical SEO audits & implementation",
      "Keyword research & content planning",
      "Google Ads campaign management",
      "Backlink acquisition & authority building",
    ],
    accent: "#059669",
    lightAccent: "rgba(5,150,105,0.08)",
    tag: "Search",
  },
  {
    id: 5,
    number: "05",
    title: "Performance Marketing",
    tagline: "Every rupee tracked. Every outcome measured.",
    description:
      "Laser-focused paid campaigns that don't waste your budget. We track and optimise every ad rupee to ensure you get measurable business outcomes, not just vanity metrics.",
    bullets: [
      "Meta, Google & programmatic ads",
      "Creative testing & iteration cycles",
      "Funnel mapping & conversion optimisation",
      "Real-time dashboards & reporting",
    ],
    accent: "#d97706",
    lightAccent: "rgba(217,119,6,0.08)",
    tag: "ROI",
  },
  {
    id: 6,
    number: "06",
    title: "Branding & Strategy",
    tagline: "A brand is a promise. We help you keep it.",
    description:
      "We help you define your brand's core identity and articulate it across every touchpoint. Building the foundation that makes every other marketing effort more effective.",
    bullets: [
      "Brand identity & visual system",
      "Competitor & market analysis",
      "Go-to-market strategy",
      "Brand guidelines & asset creation",
    ],
    accent: "#db2777",
    lightAccent: "rgba(219,39,119,0.08)",
    tag: "Identity",
  },
];

/* ─── Variants ──────────────────────────────────────────────── */
const fadeSlideUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

/* ─── Single service card ────────────────────────────────────── */
function ServiceRow({ service, index }: { service: (typeof services)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-15% 0px" });
  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      className="relative w-full grid grid-cols-1 lg:grid-cols-2 min-h-[92vh] items-center gap-0"
      style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}
    >
      {/* ─── Left: text ───────────────── */}
      <div
        className={`relative z-10 flex flex-col justify-center px-8 md:px-16 lg:px-20 py-20 ${isEven ? "lg:order-1" : "lg:order-2"}`}
      >
        {/* Service number + tag */}
        <motion.div
          variants={fadeSlideUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={0}
          className="flex items-center gap-4 mb-8"
        >
          <span
            className="text-xs font-black uppercase tracking-[0.25em]"
            style={{ color: service.accent }}
          >
            {service.number}
          </span>
          <span
            className="px-3 py-1 rounded-full text-xs font-bold tracking-wider"
            style={{
              background: service.lightAccent,
              color: service.accent,
              border: `1px solid ${service.accent}30`,
            }}
          >
            {service.tag}
          </span>
        </motion.div>

        {/* Title */}
        <motion.h2
          variants={fadeSlideUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={1}
          className="text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold tracking-tight text-gray-900 leading-[1.1] mb-4"
        >
          {service.title}
        </motion.h2>

        {/* Tagline */}
        <motion.p
          variants={fadeSlideUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={2}
          className="text-lg md:text-xl font-semibold mb-5"
          style={{ color: service.accent }}
        >
          {service.tagline}
        </motion.p>

        {/* Description */}
        <motion.p
          variants={fadeSlideUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={3}
          className="text-gray-500 leading-relaxed text-base md:text-lg mb-8 max-w-md"
        >
          {service.description}
        </motion.p>

        {/* Bullets */}
        <motion.ul
          className="space-y-3 mb-10"
          variants={fadeSlideUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={4}
        >
          {service.bullets.map((b) => (
            <li key={b} className="flex items-start gap-3">
              <span
                className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center"
                style={{ background: service.lightAccent, border: `1.5px solid ${service.accent}40` }}
              >
                <Check size={11} strokeWidth={3} style={{ color: service.accent }} />
              </span>
              <span className="text-gray-600 text-sm font-medium">{b}</span>
            </li>
          ))}
        </motion.ul>

        {/* CTA */}
        <motion.div
          variants={fadeSlideUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={5}
        >
          <Link
            href="/contact"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-2xl text-sm font-bold text-white transition-all duration-300 hover:gap-4 hover:shadow-xl group"
            style={{
              background: `linear-gradient(135deg, ${service.accent}, ${service.accent}bb)`,
              boxShadow: `0 8px 30px ${service.accent}30`,
            }}
          >
            Get Started
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>

      {/* ─── Right: 3D + decorative panel ─ */}
      <div
        className={`relative flex items-center justify-center min-h-[60vh] lg:min-h-full ${isEven ? "lg:order-2" : "lg:order-1"}`}
        style={{ background: service.lightAccent }}
      >
        {/* Big faint number watermark */}
        <span
          className="absolute select-none pointer-events-none font-black text-[clamp(140px,22vw,260px)] leading-none opacity-[0.04]"
          style={{ color: service.accent, bottom: "-0.05em", right: isEven ? "0.1em" : "auto", left: !isEven ? "0.1em" : "auto" }}
          aria-hidden
        >
          {service.number}
        </span>

        {/* Soft glow blob */}
        <div
          className="absolute w-64 h-64 rounded-full blur-3xl opacity-30 pointer-events-none"
          style={{ background: service.accent }}
        />

        {/* 3D canvas */}
        <motion.div
          className="relative z-10 w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <Service3DIcon serviceTitle={service.title} />
        </motion.div>

        {/* Decorative corner accents */}
        <div
          className="absolute top-8 right-8 w-12 h-12 rounded-full border-2 opacity-20"
          style={{ borderColor: service.accent }}
        />
        <div
          className="absolute bottom-12 left-8 w-6 h-6 rounded-full opacity-30"
          style={{ background: service.accent }}
        />
      </div>
    </div>
  );
}

/* ─── Sticky sidebar nav ─────────────────────────────────────── */
function ServicesSidebar({ active }: { active: number }) {
  return (
    <aside className="hidden xl:flex fixed left-8 top-1/2 -translate-y-1/2 z-30 flex-col gap-4">
      {services.map((s, i) => {
        const isActive = i === active;
        return (
          <button
            key={s.id}
            onClick={() => {
              const el = document.getElementById(`service-${s.id}`);
              el?.scrollIntoView({ behavior: "smooth", block: "center" });
            }}
            className="flex items-center gap-2.5 group transition-all duration-300"
            aria-label={s.title}
          >
            <motion.span
              animate={{ width: isActive ? 28 : 12, opacity: isActive ? 1 : 0.35 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="h-0.5 rounded-full inline-block"
              style={{ background: isActive ? s.accent : "#9ca3af", display: "inline-block" }}
            />
            <AnimatePresence>
              {isActive && (
                <motion.span
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  className="text-xs font-bold tracking-wide whitespace-nowrap"
                  style={{ color: s.accent }}
                >
                  {s.title}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        );
      })}
    </aside>
  );
}

/* ─── Page ───────────────────────────────────────────────────── */
export default function ServicesPage() {
  const [activeIndex, setActiveIndex] = useState(0);

  /* Track which service is in view for sidebar */
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    services.forEach((s, i) => {
      const el = document.getElementById(`service-${s.id}`);
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveIndex(i);
        },
        { threshold: 0.4 },
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <main className="min-h-screen overflow-x-hidden">
      {/* ─── Hero header ──────────────────── */}
      <section className="relative flex flex-col items-center justify-center text-center min-h-[55vh] pt-28 pb-20 px-6 overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-violet-400/10 blur-[100px]" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10"
        >
          <p className="text-violet-600 font-bold text-xs uppercase tracking-[0.3em] mb-5">
            What We Offer
          </p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-gray-900 mb-6 leading-[1.05]">
            Everything You Need<br />
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(135deg, #7c3aed, #2563eb)" }}
            >
              to Grow Online.
            </span>
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl leading-relaxed mx-auto font-medium">
            A full-stack digital partner — whether you need a website, more traffic, or a stronger brand,
            we do it all under one roof.
          </p>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
            Scroll to explore
          </span>
          <div className="w-px h-10 bg-gradient-to-b from-gray-300 to-transparent" />
        </motion.div>
      </section>

      {/* ─── Sticky sidebar ───────────────── */}
      <ServicesSidebar active={activeIndex} />

      {/* ─── Service rows ─────────────────── */}
      <div>
        {services.map((service, index) => (
          <div key={service.id} id={`service-${service.id}`}>
            <ServiceRow service={service} index={index} />
          </div>
        ))}
      </div>

      {/* ─── Bottom CTA strip ─────────────── */}
      <section className="relative py-28 px-6 text-center overflow-hidden bg-gray-950">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full bg-violet-600/20 blur-[80px]" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <p className="text-violet-400 text-xs font-bold uppercase tracking-[0.3em] mb-5">
            Ready to Start?
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-6">
            Let's Build Something{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(135deg, #a78bfa, #60a5fa)" }}
            >
              Remarkable
            </span>
          </h2>
          <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            Book a free 30-minute strategy call and we'll map out exactly how we can grow your brand.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl text-base font-bold text-white transition-all duration-300 hover:gap-5 hover:shadow-2xl group"
            style={{
              background: "linear-gradient(135deg, #7c3aed, #2563eb)",
              boxShadow: "0 12px 40px rgba(124,58,237,0.35)",
            }}
          >
            Book a Free Call
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </main>
  );
}
