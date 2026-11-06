import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // ── Neo-Brutalist Core Tokens ──
        neo: {
          bg: '#FBF9F4',
          text: '#19191C',
          yellow: '#FFE600',       // primary
          'yellow-hover': '#FFD000',
          blue: '#7DD3FC',         // secondary
          'blue-hover': '#60C5F7',
          pink: '#F472B6',         // accent
          'pink-hover': '#EC4899',
          card: '#FFFFFF',
          border: '#19191C',
          muted: '#6B7280',
          // Enhanced light-mode surfaces for visual richness
          'warm': '#FFF8E1',
          'cool': '#EFF9FF',
          'blush': '#FFF0F6',
          'mint': '#ECFDF5',
          dark: {
            bg: '#131316',
            card: '#1E1E24',
            border: '#3A3A44',
            text: '#FBF9F4',
            muted: '#9CA3AF',
          },
        },
        // Backwards-compatible aliases for old pages
        midnight: '#131316',
        navy: '#1E1E24',
        violet: '#8B5CF6',
        neon: '#7DD3FC',
        lavender: '#F472B6',
        softwhite: '#FBF9F4',
        muted: '#6B7280',
        success: '#10B981',
        warning: '#FFE600',
      },
      fontFamily: {
        heading: ['"Space Grotesk"', 'Outfit', 'system-ui', 'sans-serif'],
        body: ['Inter', '"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        handwriting: ['Caveat', 'cursive'],
        mono: ['"JetBrains Mono"', 'monospace'],
        display: ['"Space Grotesk"', 'Outfit', 'sans-serif'],
      },
      boxShadow: {
        // Light mode (black shadows)
        'neo': '4px 4px 0px #19191C',
        'neo-sm': '2px 2px 0px #19191C',
        'neo-lg': '6px 6px 0px #19191C',
        'neo-xl': '8px 8px 0px #19191C',
        // Dark mode (yellow glow shadows)
        'neo-dark': '4px 4px 0px #FFE600',
        'neo-dark-sm': '2px 2px 0px #FFE600',
        'neo-dark-lg': '6px 6px 0px #FFE600',
        // Colored accent shadows for visual depth
        'neo-white': '4px 4px 0px #FFFFFF',
        'neo-blue': '4px 4px 0px #7DD3FC',
        'neo-pink': '4px 4px 0px #F472B6',
        'neo-yellow-glow': '4px 4px 0px #FFE600',
        // Soft ambient shadows for light mode refinement
        'neo-ambient': '0 4px 20px rgba(25, 25, 28, 0.08)',
        'neo-ambient-lg': '0 8px 40px rgba(25, 25, 28, 0.10)',
      },
      borderRadius: {
        'neo-sm': '8px',
        'neo-md': '14px',
        'neo-lg': '22px',
        card: '14px',
        btn: '10px',
      },
      maxWidth: {
        container: '1280px',
      },
      animation: {
        'float': 'float 5s ease-in-out infinite',
        'spin-slow': 'spin 18s linear infinite',
        'marquee': 'marquee 25s linear infinite',
        'marquee-reverse': 'marqueeReverse 25s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        marqueeReverse: {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
