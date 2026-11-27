/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          // Authentic Tero Parbaan Brand Canvas & Accents
          canvas: '#FAF8F5',       // Warm-ivory gallery canvas
          white: '#FFFFFF',        // Crisp white card/section background
          ivory: '#FAF8F5',        // Alias for canvas
          cream: '#FAF8F5',
          'ivory-warm': '#F4EFEA',
          'cream-warm': '#F4EFEA',
          
          // Logo & Accent Colors
          crimson: '#B91C1C',      // Signature Bengali Crimson
          red: '#B91C1C',
          'crimson-hover': '#991B1B',
          'red-hover': '#991B1B',
          'crimson-soft': '#FDF2F2',
          'red-soft': '#FDF2F2',

          black: '#1A1A1A',        // Jet Black from circular brand badge
          charcoal: '#1A1A1A',
          stone: '#66615C',        // Muted body text
          'stone-light': '#9E9891',
          
          gold: '#C5A059',         // Muted Antique Gold
          'gold-light': '#E8D8B5',
          'gold-muted': '#D9C59B',
          
          border: '#EBE5DC',       // Subtle hairline border
          'border-gold': '#DFCCA3',
          'border-light': '#F2ECE4',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', '"Noto Serif Bengali"', 'Georgia', 'serif'],
        bengali: ['"Noto Serif Bengali"', 'serif'],
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      letterSpacing: {
        widest: '0.22em',
        boutique: '0.14em',
      },
      boxShadow: {
        'gold-subtle': '0 1px 4px 0 rgba(197, 160, 89, 0.12)',
        'gallery': '0 4px 20px -2px rgba(26, 26, 26, 0.05)',
      },
    },
  },
  plugins: [],
};
