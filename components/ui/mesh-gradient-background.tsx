"use client"

import { MeshGradient } from "@paper-design/shaders-react"

export function MeshGradientBackground() {
  return (
    <MeshGradient
      className="w-full h-full absolute inset-0 bg-black"
      colors={["#000000", "#1a1a1a", "#333333", "#ffffff"]}
      speed={1.0}
    />
  )
}
