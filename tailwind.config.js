/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        containment: {
          950: 'rgb(var(--c-containment-950) / <alpha-value>)',
          900: 'rgb(var(--c-containment-900) / <alpha-value>)',
          800: 'rgb(var(--c-containment-800) / <alpha-value>)',
          700: 'rgb(var(--c-containment-700) / <alpha-value>)',
          600: 'rgb(var(--c-containment-600) / <alpha-value>)',
          500: 'rgb(var(--c-containment-500) / <alpha-value>)',
        },
        cherenkov: {
          200: 'rgb(var(--c-cherenkov-200) / <alpha-value>)',
          300: 'rgb(var(--c-cherenkov-300) / <alpha-value>)',
          400: 'rgb(var(--c-cherenkov-400) / <alpha-value>)',
          500: 'rgb(var(--c-cherenkov-500) / <alpha-value>)',
          600: 'rgb(var(--c-cherenkov-600) / <alpha-value>)',
        },
        uranium: {
          300: 'rgb(var(--c-uranium-300) / <alpha-value>)',
          400: 'rgb(var(--c-uranium-400) / <alpha-value>)',
          500: 'rgb(var(--c-uranium-500) / <alpha-value>)',
          600: 'rgb(var(--c-uranium-600) / <alpha-value>)',
        },
        alloy: {
          100: 'rgb(var(--c-alloy-100) / <alpha-value>)',
          200: 'rgb(var(--c-alloy-200) / <alpha-value>)',
          300: 'rgb(var(--c-alloy-300) / <alpha-value>)',
          400: 'rgb(var(--c-alloy-400) / <alpha-value>)',
          500: 'rgb(var(--c-alloy-500) / <alpha-value>)',
          600: 'rgb(var(--c-alloy-600) / <alpha-value>)',
        },
        safety: 'rgb(var(--c-safety) / <alpha-value>)',
        hazard: 'rgb(var(--c-hazard) / <alpha-value>)',
      },
      fontFamily: {
        display: ['"Big Shoulders"', '"Space Grotesk"', 'sans-serif'],
        sans: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        'serif-reading': ['"Inter"', 'Georgia', 'serif'],
      },
      backgroundImage: {
        'hex-grid':
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='100' viewBox='0 0 56 100'%3E%3Cpath d='M28 0L56 16V50L28 66L0 50V16Z' fill='none' stroke='rgba(56,189,248,0.11)' stroke-width='1'/%3E%3Cpath d='M28 34L56 50V84L28 100L0 84V50Z' fill='none' stroke='rgba(56,189,248,0.11)' stroke-width='1'/%3E%3C/svg%3E\")",
      },
      boxShadow: {
        glow: '0 0 36px -4px rgb(var(--c-cherenkov-400) / 0.45), 0 0 14px -2px rgb(var(--c-cherenkov-300) / 0.3)',
        'glow-lg': '0 0 60px -8px rgb(var(--c-cherenkov-400) / 0.6), 0 0 24px -4px rgb(var(--c-cherenkov-200) / 0.4)',
        'glow-amber': '0 0 36px -4px rgb(var(--c-uranium-400) / 0.45), 0 0 14px -2px rgb(var(--c-uranium-300) / 0.25)',
        'glow-safety': '0 0 32px -4px rgb(var(--c-safety) / 0.45)',
        '3d': '0 20px 40px -15px rgba(0, 0, 0, 0.7), 0 0 1px 1px rgb(var(--c-cherenkov-400) / 0.15)',
        '3d-hover': '0 28px 55px -12px rgba(0, 0, 0, 0.85), 0 0 35px -5px rgb(var(--c-cherenkov-400) / 0.4)',
      },
      keyframes: {
        pulseCore: {
          '0%, 100%': { opacity: 0.6, transform: 'scale(1)' },
          '50%': { opacity: 1, transform: 'scale(1.05)' },
        },
        spinSlow: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        spinSlowReverse: {
          from: { transform: 'rotate(360deg)' },
          to: { transform: 'rotate(0deg)' },
        },
        drift: {
          '0%, 100%': { transform: 'translateY(0px) rotateX(0deg)' },
          '50%': { transform: 'translateY(-10px) rotateX(3deg)' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(400%)' },
        },
      },
      animation: {
        pulseCore: 'pulseCore 3.4s ease-in-out infinite',
        spinSlow: 'spinSlow 34s linear infinite',
        spinSlowReverse: 'spinSlowReverse 26s linear infinite',
        drift: 'drift 6s ease-in-out infinite',
        scanline: 'scanline 8s linear infinite',
      },
    },
  },
  plugins: [],
}
