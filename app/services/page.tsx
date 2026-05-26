"use client";

import { PortfolioGallery } from "@/components/ui/portfolio-gallery";

const galleryImages = [
  { src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop&q=80", alt: "Personal Branding" },
  { src: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop&q=80", alt: "Social Media" },
  { src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop&q=80", alt: "App Development" },
  { src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&q=80", alt: "SEO & SEM" },
  { src: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=600&fit=crop&q=80", alt: "Performance Ads" },
  { src: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop&q=80", alt: "Brand Strategy" },
];



export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-[#fafaf9]">
      {/* Portfolio Gallery hero */}
      <div className="pt-20">
        <PortfolioGallery
          title="Our Expertise"
          archiveButton={{ text: "Book a free call", href: "/contact" }}
          images={galleryImages}
          maxHeight={100}
          spacing="-space-x-64 md:-space-x-72"
        />
      </div>
    </div>
  );
}