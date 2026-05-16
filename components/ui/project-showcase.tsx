"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { ArrowUpRight } from "lucide-react"

export interface Project {
  title: string
  description: string
  year: string
  link: string
  image: string
}

const defaultProjects: Project[] = [
  {
    title: "Website & App Development",
    description: "High-impact website & app development tailored to your brand's growth goals.",
    year: "2024",
    link: "/services",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",
  },
  {
    title: "Performance Marketing",
    description: "Data-driven campaigns to maximize ROI and scale your customer acquisition.",
    year: "2024",
    link: "/services",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
  },
  {
    title: "Branding & Strategy",
    description: "Building memorable identities that resonate with your target audience.",
    year: "2024",
    link: "/services",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
  },
  {
    title: "SEO & SEM",
    description: "Dominate search rankings and drive high-intent organic traffic to your site.",
    year: "2024",
    link: "/services",
    image: "https://images.unsplash.com/photo-1512314889357-e157c22f938d?w=800&q=80",
  },
  {
    title: "Personal Branding",
    description: "Position yourself as an industry leader with a commanding digital presence.",
    year: "2024",
    link: "/services",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
  },
  {
    title: "Social Media Management",
    description: "Engaging content strategies that build communities and drive brand loyalty.",
    year: "2024",
    link: "/services",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80",
  },
]

export function ProjectShowcase({ projects = defaultProjects }: { projects?: Project[] }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [smoothPosition, setSmoothPosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number | null>(null)

  useEffect(() => {
    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor
    }

    const animate = () => {
      setSmoothPosition((prev) => ({
        x: lerp(prev.x, mousePosition.x, 0.15),
        y: lerp(prev.y, mousePosition.y, 0.15),
      }))
      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [mousePosition])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    }
  }

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index)
    setIsVisible(true)
  }

  const handleMouseLeave = () => {
    setHoveredIndex(null)
    setIsVisible(false)
  }

  return (
    <div ref={containerRef} onMouseMove={handleMouseMove} className="relative w-full max-w-4xl mx-auto px-0">
      <div
        className="pointer-events-none fixed z-50 overflow-hidden rounded-xl shadow-2xl"
        style={{
          left: containerRef.current?.getBoundingClientRect().left ?? 0,
          top: containerRef.current?.getBoundingClientRect().top ?? 0,
          transform: `translate3d(${smoothPosition.x + 20}px, ${smoothPosition.y - 100}px, 0)`,
          opacity: isVisible ? 1 : 0,
          scale: isVisible ? 1 : 0.8,
          transition: "opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1), scale 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <div className="relative w-[320px] h-[220px] bg-secondary rounded-xl overflow-hidden">
          {projects.map((project, index) => (
            <img
              key={project.title}
              src={project.image || "/placeholder.svg"}
              alt={project.title}
              className="absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-out"
              style={{
                opacity: hoveredIndex === index ? 1 : 0,
                scale: hoveredIndex === index ? 1 : 1.1,
                filter: hoveredIndex === index ? "none" : "blur(10px)",
              }}
            />
          ))}
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
        </div>
      </div>

      <div className="space-y-0">
        {projects.map((project, index) => (
          <a
            key={project.title}
            href={project.link}
            className="group block"
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="relative py-6 md:py-8 border-t border-border transition-all duration-300 ease-out">
              {/* Background highlight on hover */}
              <div
                className={`
                  absolute inset-0 -mx-4 px-4 bg-white/40 backdrop-blur-sm rounded-lg
                  transition-all duration-300 ease-out
                  ${hoveredIndex === index ? "opacity-100 scale-100" : "opacity-0 scale-95"}
                `}
              />

              <div className="relative flex items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                  {/* Title with animated underline */}
                  <div className="inline-flex items-center gap-2">
                    <h3 className="text-gray-900 font-bold text-2xl md:text-3xl tracking-tight">
                      {project.title}
                    </h3>

                    {/* Arrow that slides in */}
                    <ArrowUpRight
                      className={`
                        w-6 h-6 text-gray-500
                        transition-all duration-300 ease-out
                        ${
                          hoveredIndex === index
                            ? "opacity-100 translate-x-0 translate-y-0 text-blue-600"
                            : "opacity-0 -translate-x-4 translate-y-4"
                        }
                      `}
                    />
                  </div>

                  {/* Description with fade effect */}
                  <p
                    className={`
                      text-gray-500 text-base md:text-lg mt-2 leading-relaxed max-w-2xl
                      transition-all duration-300 ease-out
                      ${hoveredIndex === index ? "text-gray-700" : "text-gray-500"}
                    `}
                  >
                    {project.description}
                  </p>
                </div>

                {/* Arrow indicator */}
                <span
                  className={`
                    hidden md:flex w-12 h-12 rounded-full items-center justify-center border border-gray-200 bg-white/50 backdrop-blur-sm
                    transition-all duration-300 ease-out
                    ${hoveredIndex === index ? "bg-blue-50 border-blue-200 text-blue-600 scale-110" : "text-gray-400"}
                  `}
                >
                  <ArrowUpRight className="w-5 h-5" />
                </span>
              </div>
            </div>
          </a>
        ))}

        {/* Bottom border for last item */}
        <div className="border-t border-border" />
      </div>
    </div>
  )
}
