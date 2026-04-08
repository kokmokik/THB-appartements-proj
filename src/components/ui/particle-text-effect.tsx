"use client"

import { useEffect, useRef } from "react"

interface Vector2D {
  x: number
  y: number
}

const GOLD = { r: 212, g: 175, b: 55 }

class Particle {
  pos: Vector2D = { x: 0, y: 0 }
  vel: Vector2D = { x: 0, y: 0 }
  acc: Vector2D = { x: 0, y: 0 }
  target: Vector2D = { x: 0, y: 0 }

  closeEnoughTarget = 100
  maxSpeed = 1.0
  maxForce = 0.1
  isKilled = false

  colorWeight = 0
  colorBlendRate = 0.01

  move() {
    const dx = this.pos.x - this.target.x
    const dy = this.pos.y - this.target.y
    const distance = Math.sqrt(dx * dx + dy * dy)
    const proximityMult = distance < this.closeEnoughTarget ? distance / this.closeEnoughTarget : 1

    const tx = this.target.x - this.pos.x
    const ty = this.target.y - this.pos.y
    const mag = Math.sqrt(tx * tx + ty * ty)
    const nx = mag > 0 ? (tx / mag) * this.maxSpeed * proximityMult : 0
    const ny = mag > 0 ? (ty / mag) * this.maxSpeed * proximityMult : 0

    const sx = nx - this.vel.x
    const sy = ny - this.vel.y
    const sm = Math.sqrt(sx * sx + sy * sy)

    this.acc.x += sm > 0 ? (sx / sm) * this.maxForce : 0
    this.acc.y += sm > 0 ? (sy / sm) * this.maxForce : 0

    this.vel.x += this.acc.x
    this.vel.y += this.acc.y
    this.pos.x += this.vel.x
    this.pos.y += this.vel.y
    this.acc.x = 0
    this.acc.y = 0
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.colorWeight = Math.min(this.colorWeight + this.colorBlendRate, 1.0)
    const alpha = this.colorWeight
    ctx.fillStyle = `rgba(${GOLD.r},${GOLD.g},${GOLD.b},${alpha.toFixed(2)})`
    ctx.fillRect(this.pos.x, this.pos.y, 2, 2)
  }
}

interface ParticleTextEffectProps {
  text?: string
}

export function ParticleTextEffect({ text = "THB APPARTEMENTS" }: ParticleTextEffectProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)
  const particlesRef = useRef<Particle[]>([])

  const pixelSteps = 5

  function buildParticles(canvas: HTMLCanvasElement) {
    const offscreen = document.createElement("canvas")
    offscreen.width = canvas.width
    offscreen.height = canvas.height
    const octx = offscreen.getContext("2d")!

    octx.fillStyle = "white"
    octx.font = `bold 80px Arial, sans-serif`
    octx.textAlign = "center"
    octx.textBaseline = "middle"
    octx.fillText(text, canvas.width / 2, canvas.height / 2)

    const { data: pixels } = octx.getImageData(0, 0, canvas.width, canvas.height)

    const coords: number[] = []
    for (let i = 0; i < pixels.length; i += pixelSteps * 4) {
      if (pixels[i + 3] > 0) coords.push(i)
    }

    // Shuffle for fluid incoming motion
    for (let i = coords.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[coords[i], coords[j]] = [coords[j], coords[i]]
    }

    const particles: Particle[] = []
    for (const idx of coords) {
      const x = (idx / 4) % canvas.width
      const y = Math.floor(idx / 4 / canvas.width)

      const p = new Particle()
      // Start from a random edge position
      const angle = Math.random() * Math.PI * 2
      const dist = (canvas.width + canvas.height) / 2
      p.pos.x = canvas.width / 2 + Math.cos(angle) * dist
      p.pos.y = canvas.height / 2 + Math.sin(angle) * dist
      p.target.x = x
      p.target.y = y
      p.maxSpeed = Math.random() * 5 + 3
      p.maxForce = p.maxSpeed * 0.05
      p.colorBlendRate = Math.random() * 0.02 + 0.005
      particles.push(p)
    }

    particlesRef.current = particles
  }

  function animate() {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")!

    // Clear fully transparent — page background shows through
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    for (const p of particlesRef.current) {
      p.move()
      p.draw(ctx)
    }

    animationRef.current = requestAnimationFrame(animate)
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    canvas.width = 1000
    canvas.height = 160

    buildParticles(canvas)
    animate()

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ width: "100%", height: "auto", display: "block" }}
    />
  )
}
