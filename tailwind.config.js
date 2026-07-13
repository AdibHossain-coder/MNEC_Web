/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        containment: {
          950: '#070A0F',
          900: '#0A0E14',
          800: '#111826',
          700: '#182231',
          600: '#22303F',
          500: '#334255',
        },
        cherenkov: {
          200: '#BEEFFB',
          300: '#8FE0F5',
          400: '#5EC8E8',
          500: '#38AAD1',
          600: '#2687AC',
        },
        uranium: {
          300: '#F7D488',
          400: '#F2B33D',
          500: '#DE9A22',
          600: '#B87A15',
        },
        alloy: {
          100: '#EDF2F6',
          200: '#D6DEE6',
          300: '#AEBAC7',
          400: '#8B9BAE',
          500: '#647082',
        },
        hazard: '#E8542A',
      },
      fontFamily: {
        display: ['"Big Shoulders"', '"Space Grotesk"', 'sans-serif'],
        sans: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        'hex-grid': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='100' viewBox='0 0 56 100'%3E%3Cpath d='M28 0L56 16V50L28 66L0 50V16Z' fill='none' stroke='%23223244' stroke-width='1'/%3E%3Cpath d='M28 34L56 50V84L28 100L0 84V50Z' fill='none' stroke='%23223244' stroke-width='1'/%3E%3C/svg%3E\")",
      },
      boxShadow: {
        glow: '0 0 40px -6px rgba(94,200,232,0.45)',
        'glow-amber': '0 0 40px -6px rgba(242,179,61,0.4)',
      },
      keyframes: {
        pulseCore: {
          '0%, 100%': { opacity: 0.55, transform: 'scale(1)' },
          '50%': { opacity: 1, transform: 'scale(1.04)' },
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
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      animation: {
        pulseCore: 'pulseCore 3.4s ease-in-out infinite',
        spinSlow: 'spinSlow 34s linear infinite',
        spinSlowReverse: 'spinSlowReverse 26s linear infinite',
        drift: 'drift 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
