/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Cores institucionais do Brasil
        brazil: {
          green: {
            DEFAULT: '#009B3A',
            dark: '#006837',
            light: '#00BF4D',
          },
          yellow: {
            DEFAULT: '#FEDF00',
            dark: '#F7C600',
            light: '#FFF066',
          },
          blue: {
            DEFAULT: '#002776',
            dark: '#001A4D',
            light: '#003D99',
          },
        },
        // Dark mode
        dark: {
          bg: '#0f1117',
          card: '#1a1d26',
          border: '#2a2d36',
          text: '#e8e9ed',
          muted: '#9ca3af',
        },
        // Light mode
        light: {
          bg: '#f8f7f4',
          card: '#ffffff',
          border: '#e5e5e5',
          text: '#1a1d26',
          muted: '#6b7280',
        },
        // Accent colors
        accent: {
          gold: '#D4AF37',
          silver: '#C0C0C0',
          bronze: '#CD7F32',
        }
      },
      fontFamily: {
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'scale-up': 'scaleUp 0.2s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleUp: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
