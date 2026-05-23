"use client";

import React, { useState } from "react";
import {
  Layers,
  Zap,
  Globe,
  ArrowUpRight,
  Sparkles,
  Code2,
  Palette,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Service {
  id: string;
  title: string;
  description: string;
  tag: string;
  icon: React.ReactNode;
  /** HSL values for the radial backlight wash (e.g. "220 90% 65%") */
  backlightHsl: string;
  /** Tailwind-compatible accent hex used for the icon container glow */
  accentColor: string;
}

interface PremiumServiceCardsProps {
  services?: Service[];
}

// ─── Default Data ─────────────────────────────────────────────────────────────

const DEFAULT_SERVICES: Service[] = [
  {
    id: "design-systems",
    title: "Design Systems",
    description:
      "Scalable token-based design languages crafted with surgical precision. From atomic components to living documentation your team will actually use.",
    tag: "Brand & UI",
    icon: <Palette size={36} strokeWidth={1.4} />,
    backlightHsl: "260 85% 68%",
    accentColor: "#9333ea",
  },
  {
    id: "product-engineering",
    title: "Product Engineering",
    description:
      "Full-stack systems built to ship. From zero-to-one prototypes to production-grade platforms — architected for reliability and relentless performance.",
    tag: "Development",
    icon: <Code2 size={36} strokeWidth={1.4} />,
    backlightHsl: "217 91% 60%",
    accentColor: "#2563eb",
  },
  {
    id: "growth-infrastructure",
    title: "Growth Infrastructure",
    description:
      "Data pipelines, analytics layers, and AI-powered workflows that surface signal from noise. Built to compound returns on every decision you make.",
    tag: "Strategy & Data",
    icon: <Zap size={36} strokeWidth={1.4} />,
    backlightHsl: "186 85% 48%",
    accentColor: "#0891b2",
  },
];

// ─── Card Component ────────────────────────────────────────────────────────────

function ServiceCard({ service }: { service: Service }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="premium-card-wrapper"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        /* The wrapper creates the gradient border via padding + background */
        position: "relative",
        borderRadius: "2rem",
        padding: "1px",
        background: hovered
          ? "linear-gradient(135deg, #9333ea, #6366f1, #2563eb)"
          : "transparent",
        transition: "background 0.5s ease-out, box-shadow 0.5s ease-out",
        boxShadow: hovered
          ? "0 20px 40px -10px rgba(147,51,234,0.18), 0 8px 30px rgb(0,0,0,0.04)"
          : "0 8px 30px rgb(0,0,0,0.04), 0 1px 3px rgba(0,0,0,0.04)",
        transform: hovered ? "translateY(-8px)" : "translateY(0)",
        /* Override: when not hovered we still want the fine silver border */
      }}
    >
      {/* Fallback border rendered when not hovered (gradient wrapper bg is transparent) */}
      {!hovered && (
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "2rem",
            border: "1px solid rgba(203,213,225,0.6)",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />
      )}

      {/* ── Card Surface ──────────────────────────────────────────────────── */}
      <div
        style={{
          position: "relative",
          borderRadius: "calc(2rem - 1px)",
          overflow: "hidden",
          backgroundColor: "rgba(255,255,255,0.78)",
          backdropFilter: "blur(28px) saturate(180%)",
          WebkitBackdropFilter: "blur(28px) saturate(180%)",
          display: "flex",
          flexDirection: "column",
          minHeight: "520px",
          transition: "all 0.5s ease-out",
        }}
      >
        {/* ── Top: Radial Backlight Stage ──────────────────────────────── */}
        <div
          style={{
            position: "relative",
            height: "240px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          {/* Radial pastel wash */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              background: `radial-gradient(ellipse 80% 70% at 50% 55%, hsl(${service.backlightHsl} / 0.22) 0%, transparent 75%)`,
              transition: "opacity 0.5s ease-out",
              opacity: hovered ? 1 : 0.65,
            }}
          />

          {/* Subtle noise texture overlay */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.035'/%3E%3C/svg%3E\")",
              opacity: 0.4,
              pointerEvents: "none",
            }}
          />

          {/* Icon Container */}
          <div
            style={{
              position: "relative",
              zIndex: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "88px",
              height: "88px",
              borderRadius: "1.5rem",
              background: "rgba(255,255,255,0.9)",
              border: "1px solid rgba(203,213,225,0.5)",
              boxShadow: hovered
                ? `0 8px 32px -4px ${service.accentColor}30, 0 2px 8px rgba(0,0,0,0.06)`
                : "0 4px 16px rgba(0,0,0,0.06)",
              color: service.accentColor,
              transition: "all 0.5s ease-out",
              transform: hovered ? "scale(1.08)" : "scale(1)",
            }}
          >
            {service.icon}
          </div>

          {/* Decorative sparkle dot (top-right) */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              top: "24px",
              right: "28px",
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: `hsl(${service.backlightHsl})`,
              opacity: hovered ? 0.8 : 0.35,
              transition: "opacity 0.5s ease-out",
            }}
          />
          <div
            aria-hidden
            style={{
              position: "absolute",
              top: "44px",
              right: "48px",
              width: "3px",
              height: "3px",
              borderRadius: "50%",
              background: `hsl(${service.backlightHsl})`,
              opacity: hovered ? 0.5 : 0.2,
              transition: "opacity 0.5s ease-out",
            }}
          />
        </div>

        {/* Thin separator */}
        <div
          aria-hidden
          style={{
            height: "1px",
            margin: "0 32px",
            background:
              "linear-gradient(90deg, transparent, rgba(203,213,225,0.5), transparent)",
          }}
        />

        {/* ── Bottom: Typography & CTA ─────────────────────────────────── */}
        <div
          style={{
            flex: 1,
            padding: "28px 32px 32px",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          {/* Tag pill */}
          <div>
            <span
              style={{
                display: "inline-block",
                padding: "4px 12px",
                borderRadius: "9999px",
                background: "rgba(241,245,249,0.85)",
                border: "1px solid rgba(203,213,225,0.7)",
                fontSize: "10px",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#64748b",
                fontWeight: 700,
                fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
              }}
            >
              {service.tag}
            </span>
          </div>

          {/* Headline */}
          <h3
            style={{
              margin: 0,
              fontSize: "clamp(1.4rem, 2vw, 1.65rem)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1.15,
              color: "#0f172a",
              fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
            }}
          >
            {service.title}
          </h3>

          {/* Body text */}
          <p
            style={{
              margin: 0,
              flex: 1,
              fontSize: "0.875rem",
              lineHeight: 1.7,
              color: "#64748b",
              fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
            }}
          >
            {service.description}
          </p>

          {/* CTA Button */}
          <button
            type="button"
            style={{
              alignSelf: "flex-start",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 20px",
              borderRadius: "9999px",
              border: "none",
              cursor: "pointer",
              fontWeight: 600,
              fontSize: "0.8125rem",
              letterSpacing: "0.01em",
              fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
              background: hovered
                ? "linear-gradient(135deg, #9333ea, #2563eb)"
                : "rgba(241,245,249,0.9)",
              color: hovered ? "#ffffff" : "#64748b",
              border: hovered
                ? "1px solid transparent"
                : ("1px solid rgba(203,213,225,0.7)" as string),
              boxShadow: hovered
                ? "0 4px 16px rgba(147,51,234,0.25)"
                : "none",
              transform: hovered ? "translateY(0)" : "translateY(0)",
              opacity: hovered ? 1 : 0.7,
              transition: "all 0.5s ease-out",
            }}
          >
            <span>Explore Service</span>
            <ArrowUpRight
              size={14}
              strokeWidth={2.2}
              style={{
                transition: "transform 0.3s ease-out",
                transform: hovered ? "translate(1px, -1px)" : "translate(0,0)",
              }}
            />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Export ───────────────────────────────────────────────────────────────

export default function PremiumServiceCards({
  services = DEFAULT_SERVICES,
}: PremiumServiceCardsProps) {
  return (
    <section
      aria-label="Our Services"
      style={{
        width: "100%",
        padding: "80px 24px",
        background:
          "linear-gradient(180deg, #fafafa 0%, #f1f5f9 100%)",
      }}
    >
      {/* Section header */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto 56px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            padding: "6px 14px",
            borderRadius: "9999px",
            background: "rgba(255,255,255,0.8)",
            border: "1px solid rgba(147,51,234,0.15)",
            marginBottom: "20px",
          }}
        >
          <Sparkles
            size={12}
            strokeWidth={2}
            style={{ color: "#9333ea" }}
          />
          <span
            style={{
              fontSize: "10px",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              fontWeight: 700,
              color: "#9333ea",
              fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
            }}
          >
            What We Build
          </span>
        </div>

        <h2
          style={{
            margin: "0 0 16px",
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 700,
            letterSpacing: "-0.04em",
            lineHeight: 1.1,
            color: "#0f172a",
            fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
          }}
        >
          Crafted for outcomes
          <br />
          <span
            style={{
              background: "linear-gradient(135deg, #9333ea, #2563eb)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            that compound.
          </span>
        </h2>

        <p
          style={{
            margin: "0 auto",
            maxWidth: "480px",
            fontSize: "1rem",
            lineHeight: 1.7,
            color: "#64748b",
            fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
          }}
        >
          Three deeply integrated disciplines working as one — so every product
          we touch moves faster, converts better, and scales further.
        </p>
      </div>

      {/* Card grid */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "24px",
          alignItems: "start",
        }}
      >
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </section>
  );
}
