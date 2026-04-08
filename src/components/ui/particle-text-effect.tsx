"use client"

import { useEffect, useRef } from "react"

interface Vector2D {
  x: number
  y: number
}

// Gold shades that cycle per word
const GOLD_COLORS = [
  { r: 201, g: 149, b: 10 },  // #c9950a
  { r: 232, g: 201, b: 106 }, // #e8c96a
  { r: 212, g: 175, b: 55 },  // medium gold
  { r: 184, g: 134, b: 11 },  // dark gold
  { r: 240, g: 215, b: 130 }, // light gold
]

// Site background: #1c2a1f = rgb(28, 42, 31)
const BG = { r: 28, g: 42, b: 31 }

class Particle {
  pos: Vector2D = { x: 0, y: 0 }
  vel: Vector2D = { x: 0, y: 0 }
  acc: Vector2D = { x: 0, y: 0 }
  target: Vector2D = { x: 0, y: 0 }

  closeEnoughTarget = 100
  maxSpeed = 1.0
  maxForce = 0.1
  particleSize = 10
  isKilled = false

  startColor = { r: BG.r, g: BG.g, b: BG.b }
  targetColor = { r: BG.r, g: BG.g, b: BG.b }
  colorWeight = 0
  colorBlendRate = 0.01

  move() {
    let proximityMult = 1
    const dx = this.pos.x - this.target.x
    const dy = this.pos.y - this.target.y
    const distance = Math.sqrt(dx * dx + dy * dy)

    if (distance < this.closeEnoughTarget) {
      proximityMult = distance / this.closeEnoughTarget
    }

    const towardsTarget = { x: this.target.x - this.pos.x, y: this.target.y - this.pos.y }
    const mag = Math.sqrt(towardsTarget.x ** 2 + towardsTarget.y ** 2)
    if (mag > 0) {
      towardsTarget.x = (towardsTarget.x / mag) * this.maxSpeed * proximityMult
      towardsTarget.y = (towardsTarget.y / mag) * this.maxSpeed * proximityMult
    }

    const steer = { x: towardsTarget.x - this.vel.x, y: towardsTarget.y - this.vel.y }
    const steerMag = Math.sqrt(steer.x ** 2 + steer.y ** 2)
    if (steerMag > 0) {
      steer.x = (steer.x / steerMag) * this.maxForce
      steer.y = (steer.y / steerMag) * this.maxForce
    }

    this.acc.x += steer.x
    this.acc.y += steer.y
    this.vel.x += this.acc.x
    this.vel.y += this.acc.y
    this.pos.x += this.vel.x
    this.pos.y += this.vel.y
    this.acc.x = 0
    this.acc.y = 0
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.colorWeight < 1.0) {
      this.colorWeight = Math.min(this.colorWeight + this.colorBlendRate, 1.0)
    }
    const r = Math.round(this.startColor.r + (this.targetColor.r - this.startColor.r) * this.colorWeight)
    const g = Math.round(this.startColor.g + (this.targetColor.g - this.startColor.g) * this.colorWeight)
    const b = Math.round(this.startColor.b + (this.targetColor.b - this.startColor.b) * this.colorWeight)
    ctx.fillStyle = `rgb(${r},${g},${b})`
    ctx.fillRect(this.pos.x, this.pos.y, 2, 2)
  }

  kill(width: number, height: number) {
    if (!this.isKilled) {
      const angle = Math.random() * Math.PI * 2
      const dist = (width + height) / 2
      this.target.x = width / 2 + Math.cos(angle) * dist
      this.target.y = height / 2 + Math.sin(angle) * dist

      this.startColor = {
        r: Math.round(this.startColor.r + (this.targetColor.r - this.startColor.r) * this.colorWeight),
        g: Math.round(this.startColor.g + (this.targetColor.g - this.startColor.g) * this.colorWeight),
        b: Math.round(this.startColor.b + (this.targetColor.b - this.startColor.b) * this.colorWeight),
      }
      this.targetColor = { r: BG.r, g: BG.g, b: BG.b }
      this.colorWeight = 0
      this.isKilled = true
    }
  }
}

interface ParticleTextEffectProps {
  words?: string[]
}

const DEFAULT_WORDS = ["WILLKOMMEN", "KOMFORT", "APARTMENTS", "BUCHEN"]

export function ParticleTextEffect({ words = DEFAULT_WORDS }: ParticleTextEffectProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)
  const particlesRef = useRef<Particle[]>([])
  const frameCountRef = useRef(0)
  const wordIndexRef = useRef(0)
  const colorIndexRef = useRef(0)

  const pixelSteps = 5

  function spawnPos(width: number, height: number): Vector2D {
    const angle = Math.random() * Math.PI * 2
    const dist = (width + height) / 2
    return {
      x: width / 2 + Math.cos(angle) * dist,
      y: height / 2 + Math.sin(angle) * dist,
    }
  }

  function showWord(word: string, canvas: HTMLCanvasElement) {
    const offscreen = document.createElement("canvas")
    offscreen.width = canvas.width
    offscreen.height = canvas.height
    const octx = offscreen.getContext("2d")!

    octx.fillStyle = "white"
    octx.font = `bold 120px Arial, sans-serif`
    octx.textAlign = "center"
    octx.textBaseline = "middle"
    octx.fillText(word, canvas.width / 2, canvas.height / 2)

    const imageData = octx.getImageData(0, 0, canvas.width, canvas.height)
    const pixels = imageData.data

    const newColor = GOLD_COLORS[colorIndexRef.current % GOLD_COLORS.length]
    colorIndexRef.current++

    const particles = particlesRef.current
    let particleIndex = 0

    // Collect lit pixel indices and shuffle for fluid motion
    const coordIndexes: number[] = []
    for (let i = 0; i < pixels.length; i += pixelSteps * 4) {
      if (pixels[i + 3] > 0) coordIndexes.push(i)
    }
    for (let i = coordIndexes.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[coordIndexes[i], coordIndexes[j]] = [coordIndexes[j], coordIndexes[i]]
    }

    for (const idx of coordIndexes) {
      const x = (idx / 4) % canvas.width
      const y = Math.floor(idx / 4 / canvas.width)

      let particle: Particle
      if (particleIndex < particles.length) {
        particle = particles[particleIndex]
        particle.isKilled = false
        particleIndex++
      } else {
        particle = new Particle()
        const p = spawnPos(canvas.width, canvas.height)
        particle.pos.x = p.x
        particle.pos.y = p.y
        particle.maxSpeed = Math.random() * 5 + 3
        particle.maxForce = particle.maxSpeed * 0.05
        particle.particleSize = Math.random() * 4 + 4
        particle.colorBlendRate = Math.random() * 0.025 + 0.005
        particles.push(particle)
      }

      particle.startColor = {
        r: Math.round(particle.startColor.r + (particle.targetColor.r - particle.startColor.r) * particle.colorWeight),
        g: Math.round(particle.startColor.g + (particle.targetColor.g - particle.startColor.g) * particle.colorWeight),
        b: Math.round(particle.startColor.b + (particle.targetColor.b - particle.startColor.b) * particle.colorWeight),
      }
      particle.targetColor = newColor
      particle.colorWeight = 0
      particle.target.x = x
      particle.target.y = y
    }

    for (let i = particleIndex; i < particles.length; i++) {
      particles[i].kill(canvas.width, canvas.height)
    }
  }

  function animate() {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")!
    const particles = particlesRef.current

    // Motion blur trail using site background color
    ctx.fillStyle = `rgba(${BG.r},${BG.g},${BG.b},0.15)`
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i]
      p.move()
      p.draw(ctx)
      if (p.isKilled && (p.pos.x < -50 || p.pos.x > canvas.width + 50 || p.pos.y < -50 || p.pos.y > canvas.height + 50)) {
        particles.splice(i, 1)
      }
    }

    frameCountRef.current++
    if (frameCountRef.current % 220 === 0) {
      wordIndexRef.current = (wordIndexRef.current + 1) % words.length
      showWord(words[wordIndexRef.current], canvas)
    }

    animationRef.current = requestAnimationFrame(animate)
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    canvas.width = 1000
    canvas.height = 260

    // Fill with background color immediately to avoid white flash
    const ctx = canvas.getContext("2d")!
    ctx.fillStyle = `rgb(${BG.r},${BG.g},${BG.b})`
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    showWord(words[0], canvas)
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
