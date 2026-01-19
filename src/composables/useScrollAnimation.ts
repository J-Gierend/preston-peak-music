import { onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useScrollAnimation() {
  onMounted(() => {
    ScrollTrigger.refresh()
  })

  onUnmounted(() => {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill())
  })

  function fadeInOnScroll(selector: string, options: gsap.TweenVars = {}) {
    return gsap.from(selector, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: selector,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      },
      ...options
    })
  }

  function staggerFadeIn(selector: string, stagger = 0.1) {
    return gsap.from(selector, {
      opacity: 0,
      y: 20,
      duration: 0.6,
      stagger,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: selector,
        start: 'top 85%'
      }
    })
  }

  function parallax(selector: string, speed = 0.5) {
    return gsap.to(selector, {
      y: () => window.innerHeight * speed * -1,
      ease: 'none',
      scrollTrigger: {
        trigger: selector,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    })
  }

  return {
    fadeInOnScroll,
    staggerFadeIn,
    parallax,
    gsap,
    ScrollTrigger
  }
}
