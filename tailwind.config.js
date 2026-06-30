/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // --- Marquee design tokens ---
        // A late-night premium-events palette: velvet dark, champagne gold,
        // spotlight magenta, stage blue. Deliberately not the generic
        // near-black + acid-green combo.
        velvet: {
          950: '#08070D',
          900: '#0B0A14',
          800: '#131120',
          700: '#1C1830',
          600: '#272140',
        },
        cream: {
          50: '#FDFBF6',
          100: '#F7F2E9',
          200: '#EFE6D4',
        },
        plum: {
          900: '#1C1330',
          700: '#2E2147',
        },
        gold: {
          300: '#F2D29B',
          400: '#E8B563',
          500: '#D69A3C',
          600: '#B57B25',
        },
        spotlight: {
          400: '#D27CF5',
          500: '#C158F0',
          600: '#A23BD4',
        },
        stage: {
          400: '#7FA3FF',
          500: '#5B8DFF',
          600: '#3E6BE0',
        },
      },
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        body: ['"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        'marquee-gradient': 'radial-gradient(circle at 20% 20%, rgba(193,88,240,0.25), transparent 45%), radial-gradient(circle at 80% 0%, rgba(91,141,255,0.18), transparent 40%), radial-gradient(circle at 50% 100%, rgba(232,181,99,0.12), transparent 45%)',
        'ticket-edge': 'repeating-linear-gradient(to bottom, transparent 0 6px, rgba(255,255,255,0.18) 6px 14px)',
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(232,181,99,0.18), 0 8px 40px -8px rgba(193,88,240,0.35)',
        'glow-blue': '0 0 0 1px rgba(91,141,255,0.18), 0 8px 40px -8px rgba(91,141,255,0.35)',
        'glow-gold': '0 0 0 1px rgba(232,181,99,0.3), 0 8px 30px -6px rgba(232,181,99,0.45)',
        glass: '0 8px 32px 0 rgba(0,0,0,0.28)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4,0,0.6,1) infinite',
        shimmer: 'shimmer 1.8s infinite',
        marquee: 'marquee 28s linear infinite',
        float: 'float 6s ease-in-out infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-500px 0' },
          '100%': { backgroundPosition: '500px 0' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
}
