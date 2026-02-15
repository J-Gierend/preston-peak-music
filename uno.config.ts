import { defineConfig, presetUno, presetIcons } from 'unocss'
import transformerDirectives from '@unocss/transformer-directives'

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons({
      scale: 1.2,
      cdn: 'https://esm.sh/'
    })
  ],
  transformers: [
    transformerDirectives()
  ],
  theme: {
    colors: {
      classical: {
        bg: '#1a2a3a',
        bgAlt: '#2a3a4a',
        accent: '#c9a85c',
        text: '#f8f4ef',
        textMuted: '#b8a8a0'
      },
      gaming: {
        bg: '#181820',
        bgAlt: '#252035',
        accent: '#70d4d0',
        accentAlt: '#c580c5',
        text: '#f0f0f5'
      }
    },
    fontFamily: {
      display: ['Inter', 'sans-serif'],
      body: ['Inter', 'sans-serif']
    }
  },
  shortcuts: {
    'btn': 'px-4 py-2 transition-all duration-300 cursor-pointer',
    'btn-primary': 'btn bg-[var(--accent)] text-[var(--bg-primary)] hover:opacity-90',
    'btn-outline': 'btn border border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--bg-primary)]',
    'card': 'bg-[var(--bg-secondary)] p-6 transition-all duration-300',
    'section-padding': 'px-4 py-16 md:px-8 lg:px-16 lg:py-24',
  }
})
