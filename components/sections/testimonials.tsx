"use client"

import * as React from "react"
import { CircularTestimonials } from "@/components/ui/circular-testimonials"

const TESTIMONIALS = [
  {
    quote:
      "Their innovative solutions and quick turnaround time made our collaboration incredibly successful. Highly recommended! Working with them was a game-changer.",
    name: "James S.",
    designation: "Frontend Developer",
    src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    quote:
      "The attention to detail and user experience in their work is exceptional. I'm thoroughly impressed with the final product and how easily they adapt to requirements.",
    name: "Jessica H.",
    designation: "Web Designer",
    src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D",
  },
  {
    quote:
      "Working with them was a game-changer for our project. Their expertise and professionalism exceeded our expectations from day one.",
    name: "Lisa M.",
    designation: "UX Designer",
    src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=60",
  },
  {
    quote:
      "The quality of work and communication throughout the project was outstanding. They delivered exactly what we needed, on time and on budget.",
    name: "Jane D.",
    designation: "UI/UX Designer",
    src: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDN8fHxlbnwwfHx8fHw%3D",
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-24 relative overflow-hidden bg-[#fafafa]">
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-blue-600 font-bold text-sm uppercase tracking-widest mb-4">Social Proof</p>
          <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900">
            What Our Clients Say
          </h2>
        </div>
        
        <div className="flex items-center justify-center relative w-full">
          <CircularTestimonials
            testimonials={TESTIMONIALS}
            autoplay={true}
            colors={{
              name: "#111827",
              designation: "#6b7280",
              testimony: "#374151",
              arrowBackground: "#ffffff",
              arrowForeground: "#111827",
              arrowHoverBackground: "#f3f4f6",
            }}
            fontSizes={{
              name: "2rem",
              designation: "0.875rem",
              quote: "1.25rem",
            }}
          />
        </div>
      </div>
    </section>
  )
}

