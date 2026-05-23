"use client";

import React, { useRef } from "react";
import {
  FullScreenScrollFX,
  FullScreenFXAPI,
} from "@/components/ui/full-screen-scroll-fx";

// ─── Services mapped to FullScreenScrollFX sections ──────────────────────────
const sections = [
  {
    id: "personal-branding",
    leftLabel: "Identity",
    title: "Personal Branding",
    rightLabel: "Authority",
    background:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1920&q=85&auto=format&fit=crop",
  },
  {
    id: "social-media",
    leftLabel: "Engagement",
    title: "Social Media",
    rightLabel: "Presence",
    background:
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1920&q=85&auto=format&fit=crop",
  },
  {
    id: "app-development",
    leftLabel: "Engineering",
    title: "App Development",
    rightLabel: "Performance",
    background:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1920&q=85&auto=format&fit=crop",
  },
  {
    id: "seo-sem",
    leftLabel: "Visibility",
    title: "SEO & SEM",
    rightLabel: "Growth",
    background:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&q=85&auto=format&fit=crop",
  },
  {
    id: "performance-ads",
    leftLabel: "Targeting",
    title: "Performance Ads",
    rightLabel: "ROAS",
    background:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1920&q=85&auto=format&fit=crop",
  },
  {
    id: "brand-strategy",
    leftLabel: "Foundation",
    title: "Brand Strategy",
    rightLabel: "Trust",
    background:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1920&q=85&auto=format&fit=crop",
  },
];

export default function ServicesPage() {
  const apiRef = useRef<FullScreenFXAPI>(null);

  return (
    <FullScreenScrollFX
      apiRef={apiRef}
      sections={sections}
      header={
        <>
          <div>Our</div>
          <div>Services</div>
        </>
      }
      footer={<div />}
      showProgress
      bgTransition="fade"
      parallaxAmount={4}
      durations={{ change: 0.72, snap: 850 }}
      gridPaddingX={3}
      gap={1}
      colors={{
        text: "rgba(255, 255, 255, 0.94)",
        overlay: "rgba(0, 0, 0, 0.42)",
        pageBg: "#080808",
        stageBg: "#080808",
      }}
      ariaLabel="Maverick Digitals — Services"
    />
  );
}