"use client";

import React from "react";
import { motion } from "motion/react";
import { TestimonialsColumn } from "@/components/ui/testimonials-columns-1";

const testimonials = [
  {
    text: "Their innovative approach to digital marketing transformed our online presence completely. We saw a 3x increase in leads within the first quarter.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
    name: "James Sullivan",
    role: "CEO, TechVentures",
  },
  {
    text: "The attention to detail and creative execution exceeded all our expectations. Our brand now stands out in a crowded market.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
    name: "Lisa Monroe",
    role: "Marketing Director",
  },
  {
    text: "Working with this team was a game-changer. Their SEO strategy brought us to page one for every major keyword in our industry.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    name: "David Park",
    role: "Founder, GrowthLabs",
  },
  {
    text: "The website they built for us converts at nearly double our old site. The UX is intuitive and our customers love it.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
    name: "Sarah Chen",
    role: "E-commerce Manager",
  },
  {
    text: "From strategy to execution, they handled everything seamlessly. Our paid ads now deliver a consistent 8x return on ad spend.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop",
    name: "Michael Torres",
    role: "Head of Growth",
  },
  {
    text: "Their team is incredibly responsive and truly cares about client results. They feel like an extension of our own marketing team.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop",
    name: "Emma Williams",
    role: "Brand Strategist",
  },
  {
    text: "The brand identity they crafted for us is timeless and professional. We receive compliments from partners and clients every day.",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=200&auto=format&fit=crop",
    name: "Priya Nair",
    role: "Co-Founder",
  },
  {
    text: "Our content marketing campaigns now drive real business results. The storytelling quality is on another level — truly world-class.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop",
    name: "Robert Kim",
    role: "VP of Sales",
  },
  {
    text: "They delivered a complete digital transformation for our company in under three months. I couldn't recommend them more highly.",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=200&auto=format&fit=crop",
    name: "Ava Johnson",
    role: "Operations Lead",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

export function TestimonialsSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container z-10 mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-[540px] mx-auto"
        >
          <div className="flex justify-center">
            <div className="border border-gray-200 bg-white py-1 px-4 rounded-lg text-sm font-medium text-gray-300 shadow-sm">
              Social Proof
            </div>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-gray-50 text-center mt-5">
            What Our Clients Say
          </h2>
          <p className="text-center mt-5 text-gray-400 leading-relaxed">
            Trusted by ambitious brands. See why our clients keep coming back.
          </p>
        </motion.div>

        <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn
            testimonials={secondColumn}
            className="hidden md:block"
            duration={19}
          />
          <TestimonialsColumn
            testimonials={thirdColumn}
            className="hidden lg:block"
            duration={17}
          />
        </div>
      </div>
    </section>
  );
}
