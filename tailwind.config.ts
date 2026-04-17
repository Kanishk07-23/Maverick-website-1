import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        muted: 'var(--muted)',
        'muted-foreground': 'var(--muted-foreground)',
        border: 'var(--border)',
        card: 'var(--card)',
        brand: {
          purple: 'var(--brand-purple)',
          violet: 'var(--brand-violet)',
          blue: 'var(--brand-blue)',
          dark: 'var(--background)',  // mapped to background so dark mode maps well
          slate: 'var(--muted)',
          lavender: 'var(--brand-lavender)',
          whatsapp: '#25D366',
        },
      },
      fontFamily: {
        grotesk: ['var(--font-outfit)', 'sans-serif'],
        inter: ['var(--font-jakarta)', 'sans-serif'],
        outfit: ['var(--font-outfit)', 'sans-serif'],
        jakarta: ['var(--font-jakarta)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      backgroundImage: {
        'grad-brand': 'linear-gradient(135deg, var(--brand-purple) 0%, var(--brand-violet) 50%, var(--brand-blue) 100%)',
        'grad-dark': 'linear-gradient(180deg, var(--background) 0%, var(--muted) 100%)',
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'marquee': 'marquee 30s linear infinite',
        'marquee2': 'marquee2 30s linear infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(124, 58, 237, 0.4)' },
          '50%': { boxShadow: '0 0 40px rgba(124, 58, 237, 0.8)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        marquee2: {
          '0%': { transform: 'translateX(50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
      },
    },
  },
  plugins: [],
}
export default config
