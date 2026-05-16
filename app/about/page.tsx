"use client";

import { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import Link from "next/link";

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const INDUSTRIES = [
  "D2C Brands",
  "Healthcare & Clinics",
  "Travel & Hospitality",
  "Coaches & Consultants",
  "B2B Startups",
  "Wedding Planners",
];

const TEAM = [
  {
    name: "Muskan Rathod",
    role: "Founder & Brand Strategist",
    bio: "Expert in storytelling, personal branding, and scaling businesses with digital-first positioning. Muskan leads creative strategy and ensures every brand narrative resonates with its audience.",
    skills: ["Brand Strategy", "Growth Marketing", "Storytelling", "Personal Branding"],
    email: "muskan.maverickdigitals@gmail.com",
    linkedin: "https://www.linkedin.com/in/muskan-rathod-9097a0202",
    color: "#9333ea",
    letter: "M",
    image: "/muskan.jpg",
    index: 0,
  },
  {
    name: "Dhaval Shah",
    role: "Co-Founder & Tech Innovator",
    bio: "5+ years in scalable web and app development, specializing in building conversion-optimized digital platforms. Dhaval architects the technical backbone behind every Maverick product.",
    skills: ["Web Development", "App Development", "MERN Stack", "Platform Optimization"],
    email: "dhaval.maverickdigitals@gmail.com",
    linkedin: "#",
    color: "#2563eb",
    letter: "D",
    image: "/dhaval.jpg",
    index: 1,
  },
];

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function FounderCard({ member }: { member: typeof TEAM[0] }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: member.index * 0.18, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative cursor-default"
    >
      {/* Outer glow on hover */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        className="absolute -inset-px rounded-3xl blur-sm"
        style={{ background: `linear-gradient(135deg, ${member.color}40, transparent)` }}
      />

      <div className="relative rounded-3xl bg-white border border-gray-100 overflow-hidden">

        {/* Top: large letter + name block */}
        <div className="relative h-52 overflow-hidden flex items-end">
          {/* Background texture */}
          <div
            className="absolute inset-0 transition-transform duration-700"
            style={{
              background: `radial-gradient(ellipse at 30% 50%, ${member.color}18 0%, transparent 70%), linear-gradient(135deg, #fafafa 0%, #f3f4f6 100%)`,
            }}
          />

          {/* Giant letter — decorative */}
          <motion.span
            animate={{ x: hovered ? 8 : 0, opacity: hovered ? 0.07 : 0.05 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-6 bottom-0 font-black leading-none select-none pointer-events-none"
            style={{
              fontSize: "clamp(120px, 20vw, 180px)",
              color: member.color,
              fontFamily: "Poppins, sans-serif",
            }}
          >
            {member.letter}
          </motion.span>

          {/* Avatar pill */}
          <div className="relative z-10 flex items-center gap-5 p-7">
            <motion.div
              animate={{ scale: hovered ? 1.05 : 1 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-16 h-16 rounded-2xl overflow-hidden flex items-center justify-center shadow-xl flex-shrink-0 border-2 border-white/80"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover object-top"
              />
            </motion.div>
            <div>
              <h3 className="text-2xl font-black text-gray-900 tracking-tight leading-tight">
                {member.name}
              </h3>
              <p
                className="text-sm font-semibold mt-0.5"
                style={{ color: member.color }}
              >
                {member.role}
              </p>
            </div>
          </div>
        </div>

        {/* Thin gradient divider */}
        <div
          className="h-px w-full transition-opacity duration-300"
          style={{
            background: `linear-gradient(90deg, transparent, ${member.color}40, transparent)`,
            opacity: hovered ? 1 : 0.4,
          }}
        />

        {/* Body */}
        <div className="p-7 space-y-6">
          <p className="text-gray-500 leading-relaxed text-sm">
            {member.bio}
          </p>

          {/* Skills */}
          <div className="flex flex-wrap gap-2">
            {member.skills.map((skill, i) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: member.index * 0.18 + 0.3 + i * 0.07 }}
                className="px-3 py-1 rounded-full text-xs font-semibold border transition-colors duration-300"
                style={{
                  borderColor: hovered ? `${member.color}40` : "#e5e7eb",
                  color: hovered ? member.color : "#6b7280",
                  backgroundColor: hovered ? `${member.color}08` : "transparent",
                }}
              >
                {skill}
              </motion.span>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-2">
            <a
              href={`mailto:${member.email}`}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white transition-all duration-300 shadow-md cursor-pointer"
              style={{ background: `linear-gradient(135deg, ${member.color}, ${member.index === 0 ? "#2563eb" : "#9333ea"})` }}
            >
              <Mail className="w-3.5 h-3.5" />
              Get in Touch
            </a>
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-xs font-bold hover:border-gray-400 transition-all duration-300 cursor-pointer"
            >
              <LinkedinIcon />
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function AboutPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  return (
    <main ref={containerRef} className="min-h-screen overflow-x-hidden">

      {/* Ambient orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[10%] right-[10%] w-[500px] h-[500px] rounded-full bg-purple-400/6 blur-[130px]" />
        <div className="absolute top-[50%] left-[5%] w-[400px] h-[400px] rounded-full bg-blue-400/8 blur-[120px]" />
        <div className="absolute bottom-[20%] right-[20%] w-[300px] h-[300px] rounded-full bg-purple-300/5 blur-[100px]" />
      </div>

      {/* HERO */}
      <section className="relative z-10 min-h-[90vh] flex flex-col justify-center max-w-7xl mx-auto px-6 pt-32 pb-20">
        <motion.div style={{ y: heroY, opacity: heroOpacity }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-8"
          >
            <span className="h-px w-12 bg-gradient-to-r from-purple-500 to-blue-600" />
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-gray-400">Our Story</span>
          </motion.div>

          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="text-7xl md:text-8xl lg:text-[9rem] font-black tracking-tighter leading-[0.9] mb-6"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              We Are
              <br />
              <span className="brand-gradient-text">Maverick.</span>
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-2xl md:text-3xl font-semibold text-gray-400 max-w-2xl mt-6 leading-relaxed"
          >
            Turn Attention Into Revenue.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-gray-600 text-lg leading-relaxed max-w-2xl mt-6"
          >
            A Mumbai-based full-stack digital agency helping ambitious brands scale through high-conversion strategy, storytelling, and execution.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="flex items-center gap-4 mt-10"
          >
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-2xl brand-gradient text-white font-bold hover:opacity-90 transition-all duration-300 shadow-lg shadow-purple-500/20 cursor-pointer"
            >
              Work With Us
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl border border-gray-200 text-gray-700 font-semibold hover:border-purple-300 hover:text-purple-700 transition-all duration-300 cursor-pointer"
            >
              Our Services
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* OUR STORY */}
      <section className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <Reveal>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-purple-200/30 to-blue-200/20 rounded-[2.5rem] blur-xl" />
              <div className="relative rounded-3xl overflow-hidden border border-gray-100 shadow-2xl shadow-gray-200/60">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&q=85&fit=crop"
                  alt="Maverick team collaborating"
                  className="w-full h-[520px] object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-white text-sm font-semibold opacity-80">Founded in Mumbai, serving brands worldwide</p>
                </div>
              </div>
            </div>
          </Reveal>

          <div className="space-y-8">
            <Reveal>
              <div className="flex items-center gap-3 mb-2">
                <span className="h-px w-8 bg-gradient-to-r from-purple-500 to-blue-600" />
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">Our Foundation</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight">
                Built by builders,<br />
                <span className="brand-gradient-text">for builders.</span>
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="text-gray-600 text-lg leading-relaxed">
                Maverick Digitals was co-founded by <strong className="text-gray-900">Muskan Rathod</strong> and <strong className="text-gray-900">Dhaval Shah</strong>, bringing together brand strategy and technical innovation. We're not just another agency — we're a growth partner.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-gray-600 text-lg leading-relaxed">
                Known for blending creativity, psychology, and data, we deliver measurable business outcomes. Whether you need a complete digital transformation or want to optimize your existing marketing, we're ready to deliver results that matter.
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Industries We Serve</p>
                <div className="flex flex-wrap gap-2">
                  {INDUSTRIES.map((ind) => (
                    <span
                      key={ind}
                      className="px-4 py-1.5 rounded-full text-sm font-medium border border-gray-200 text-gray-600 hover:border-purple-300 hover:text-purple-700 hover:bg-purple-50 transition-all duration-300 cursor-default"
                    >
                      {ind}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="relative z-10 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="h-px w-8 bg-gradient-to-r from-purple-500 to-blue-600" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">The People</span>
              <span className="h-px w-8 bg-gradient-to-l from-purple-500 to-blue-600" />
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 tracking-tighter leading-tight">
              Meet the <span className="brand-gradient-text">minds</span><br />behind Maverick.
            </h2>
            <p className="text-gray-500 text-lg mt-4 max-w-xl mx-auto leading-relaxed">
              Two founders. One mission. Building the digital future for ambitious brands.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {TEAM.map((member) => (
              <FounderCard key={member.name} member={member} />
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
