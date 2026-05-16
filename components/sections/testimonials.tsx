"use client"

import * as React from "react"
import {
  CardTransformed,
  CardsContainer,
  ContainerScroll,
  ReviewStars,
} from "@/components/blocks/animated-cards-stack"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const TESTIMONIALS = [
  {
    id: "testimonial-3",
    name: "James S.",
    profession: "Frontend Developer",
    rating: 5,
    description:
      "Their innovative solutions and quick turnaround time made our collaboration incredibly successful. Highly recommended!",
    avatarUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "testimonial-1",
    name: "Jessica H.",
    profession: "Web Designer",
    rating: 4.5,
    description:
      "The attention to detail and user experience in their work is exceptional. I'm thoroughly impressed with the final product.",
    avatarUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: "testimonial-2",
    name: "Lisa M.",
    profession: "UX Designer",
    rating: 5,
    description:
      "Working with them was a game-changer for our project. Their expertise and professionalism exceeded our expectations.",
    avatarUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=60",
  },
  {
    id: "testimonial-4",
    name: "Jane D.",
    profession: "UI/UX Designer",
    rating: 4.5,
    description:
      "The quality of work and communication throughout the project was outstanding. They delivered exactly what we needed.",
    avatarUrl:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDN8fHxlbnwwfHx8fHw%3D",
  },
]



export function TestimonialsSection() {
  return (
    <section className="pt-20 pb-0 relative">
      <div className="relative z-10">
        <div className="text-center mb-16">
          <p className="text-blue-600 font-bold text-sm uppercase tracking-widest mb-4">Social Proof</p>
          <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900">
            What Our Clients Say
          </h2>
        </div>
        <ContainerScroll className="container mx-auto h-[100vh]">
          <div className="sticky left-0 top-0 h-svh w-full flex flex-col items-center justify-center">
            <CardsContainer className="mx-auto size-full h-[450px] w-[350px]">
              {TESTIMONIALS.map((testimonial, index) => (
                <CardTransformed
                  arrayLength={TESTIMONIALS.length}
                  key={testimonial.id}
                  variant="light"
                  index={index + 2}
                  role="article"
                  aria-labelledby={`card-${testimonial.id}-title`}
                  aria-describedby={`card-${testimonial.id}-content`}
                >
                  <div className="flex flex-col items-center space-y-4 text-center">
                    <ReviewStars
                      className="text-yellow-400"
                      rating={testimonial.rating}
                    />
                    <div className="mx-auto w-4/5 text-lg text-gray-700">
                      <blockquote cite="#">"{testimonial.description}"</blockquote>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Avatar className="!size-12 border border-stone-300">
                      <AvatarImage
                        src={testimonial.avatarUrl}
                        alt={`Portrait of ${testimonial.name}`}
                      />
                      <AvatarFallback>
                        {testimonial.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-left">
                      <span className="block text-lg font-semibold tracking-tight md:text-xl text-gray-900">
                        {testimonial.name}
                      </span>
                      <span className="block text-sm text-gray-500 font-medium">
                        {testimonial.profession}
                      </span>
                    </div>
                  </div>
                </CardTransformed>
              ))}
            </CardsContainer>
          </div>
        </ContainerScroll>
      </div>
    </section>
  )
}
