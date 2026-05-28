import { useEffect, useRef } from 'react'

const PARTICLE_COUNT = 80
const CONNECTION_DIST = 120

function rand(min, max) {
  return Math.random() * (max - min) + min
}

export default function ParticleBackground() {
  const canvasRef = useRef(null)
  const animRef   = useRef(null)
  const particles = useRef([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    particles.current = Array.from({ length: PARTICLE_COUNT }, () => ({
      x:  rand(0, canvas.width),
      y:  rand(0, canvas.height),
      vx: rand(-0.3, 0.3),
      vy: rand(-0.3, 0.3),
      r:  rand(1, 2.5),
      alpha: rand(0.2, 0.7),
    }))

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const pts = particles.current
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i]
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > canvas.width)  p.vx *= -1
        if (p.y < 0 || p.y > canvas.height)  p.vy *= -1

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0,255,136,${p.alpha})`
        ctx.fill()

        for (let j = i + 1; j < pts.length; j++) {
          const q  = pts[j]
          const dx = p.x - q.x
          const dy = p.y - q.y
          const d  = Math.sqrt(dx * dx + dy * dy)
          if (d < CONNECTION_DIST) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(q.x, q.y)
            const opacity = (1 - d / CONNECTION_DIST) * 0.15
            ctx.strokeStyle = `rgba(0,207,255,${opacity})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }
      animRef.current = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animRef.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  )
}
