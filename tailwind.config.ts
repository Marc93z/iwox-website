import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#050710',
          deep: '#0a0f24',
          surface: '#0f172a',
        },
        brand: {
          blue: '#60a5fa',
          violet: '#a78bfa',
        },
        whatsapp: {
          DEFAULT: '#25D366',
          dark: '#1ea855',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-orbitron)', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%)',
        'gradient-bg': 'linear-gradient(135deg, #050710 0%, #0a0f24 100%)',
      },
      boxShadow: {
        glow: '0 20px 60px rgba(96, 165, 250, 0.15)',
        'glow-strong': '0 10px 30px rgba(96, 165, 250, 0.4)',
        'glow-wa': '0 10px 30px rgba(37, 211, 102, 0.4)',
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'fade-in-up': 'fadeInUp 1s ease-out',
        'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSoft: {
          '0%, 100%': { boxShadow: '0 10px 40px rgba(96, 165, 250, 0.2)' },
          '50%': { boxShadow: '0 10px 40px rgba(96, 165, 250, 0.4)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
