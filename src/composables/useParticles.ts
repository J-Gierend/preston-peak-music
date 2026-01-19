import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useTheme } from './useTheme'

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  opacity: number
  char: string
}

export function useParticles(canvasRef: { value: HTMLCanvasElement | null }) {
  const isActive = ref(true)
  const { aesthetic } = useTheme()

  let ctx: CanvasRenderingContext2D | null = null
  let particles: Particle[] = []
  let animationId: number | null = null

  const PARTICLE_COUNT = 15 // More visible particles
  const CLASSICAL_CHARS = ['♪', '♫', '♩', '♬', '𝄞']
  const GAMING_CHARS = ['■', '□', '▪', '◆', '●', '○']

  function getAccentColor(): string {
    return aesthetic.value === 'gaming' ? '#70d4d0' : '#c9a85c'
  }

  function getChars(): string[] {
    return aesthetic.value === 'gaming' ? GAMING_CHARS : CLASSICAL_CHARS
  }

  function createParticle(): Particle {
    const canvas = canvasRef.value
    const chars = getChars()
    if (!canvas) {
      return {
        x: 0, y: 0, size: 18, speedX: 0, speedY: -0.5,
        opacity: 0.4, char: '♪'
      }
    }

    const isGaming = aesthetic.value === 'gaming'
    return {
      x: Math.random() * canvas.width,
      y: canvas.height + 20,
      size: isGaming ? (8 + Math.random() * 12) : (16 + Math.random() * 14),
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: -(0.3 + Math.random() * 0.5),
      opacity: 0.25 + Math.random() * 0.35,
      char: chars[Math.floor(Math.random() * chars.length)]
    }
  }

  function initParticles(): void {
    particles = []
    const canvas = canvasRef.value
    if (!canvas) return

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const p = createParticle()
      p.y = Math.random() * canvas.height
      particles.push(p)
    }
  }

  function updateParticle(p: Particle): void {
    const canvas = canvasRef.value
    if (!canvas) return

    p.x += p.speedX
    p.y += p.speedY
    p.speedX += (Math.random() - 0.5) * 0.02

    if (p.y < -30 || p.x < -30 || p.x > canvas.width + 30) {
      Object.assign(p, createParticle())
    }
  }

  function draw(): void {
    if (!ctx || !canvasRef.value || !isActive.value) return

    const canvas = canvasRef.value
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const color = getAccentColor()

    const isGaming = aesthetic.value === 'gaming'

    particles.forEach((p) => {
      updateParticle(p)

      // Use pixel-style font for gaming, serif for classical
      ctx!.font = isGaming
        ? `bold ${p.size}px monospace`
        : `${p.size}px "Times New Roman", serif`
      ctx!.fillStyle = color
      ctx!.globalAlpha = p.opacity

      // Add glow effect for gaming mode
      if (isGaming) {
        ctx!.shadowColor = color
        ctx!.shadowBlur = 12
      } else {
        ctx!.shadowBlur = 0
      }

      ctx!.fillText(p.char, p.x, p.y)
    })

    ctx.shadowBlur = 0

    ctx.globalAlpha = 1
    animationId = requestAnimationFrame(draw)
  }

  function resize(): void {
    const canvas = canvasRef.value
    if (!canvas) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }

  function handleVisibilityChange(): void {
    isActive.value = !document.hidden
    if (isActive.value && !animationId) {
      draw()
    }
  }

  onMounted(() => {
    const canvas = canvasRef.value
    if (!canvas) return

    ctx = canvas.getContext('2d')
    resize()
    initParticles()
    draw()

    window.addEventListener('resize', resize)
    document.addEventListener('visibilitychange', handleVisibilityChange)
  })

  onUnmounted(() => {
    if (animationId) {
      cancelAnimationFrame(animationId)
    }
    window.removeEventListener('resize', resize)
    document.removeEventListener('visibilitychange', handleVisibilityChange)
  })

  watch(aesthetic, () => {
    // Reinitialize particles with new theme chars
    initParticles()
  })

  return {
    isActive
  }
}
