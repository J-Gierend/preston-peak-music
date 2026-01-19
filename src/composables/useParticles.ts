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

  const PARTICLE_COUNT = 8 // Subtle: 5-10 particles
  const CHARS = ['♪', '♫', '•', '∘']

  function getAccentColor(): string {
    return aesthetic.value === 'gaming' ? '#70d4d0' : '#c9a85c'
  }

  function createParticle(): Particle {
    const canvas = canvasRef.value
    if (!canvas) {
      return {
        x: 0, y: 0, size: 12, speedX: 0, speedY: -0.3,
        opacity: 0.3, char: '♪'
      }
    }

    return {
      x: Math.random() * canvas.width,
      y: canvas.height + 20,
      size: 10 + Math.random() * 8,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: -(0.2 + Math.random() * 0.3),
      opacity: 0.15 + Math.random() * 0.25,
      char: CHARS[Math.floor(Math.random() * CHARS.length)]
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

    particles.forEach((p) => {
      updateParticle(p)
      ctx!.font = `${p.size}px serif`
      ctx!.fillStyle = color
      ctx!.globalAlpha = p.opacity
      ctx!.fillText(p.char, p.x, p.y)
    })

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
    // Colors will update on next frame
  })

  return {
    isActive
  }
}
