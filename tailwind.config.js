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
          cream: '#FAF9F6',       // Base background
          'cream-warm': '#F5F2EB',  // Subtle warm surface
          'cream-card': '#FFFFFF',  // Clean card surface
          red: '#8B0000',         // Muted elegant primary red accent
          'red-hover': '#700000',   // Deep burgundy hover
          'red-soft': '#F7EBEB',    // Light red tint for subtle badges/highlights
          charcoal: '#1C1917',    // Refined high-contrast dark text
          stone: '#78716C',       // Muted secondary text
          border: '#E7E2D7',      // Minimalist hairline border
          'border-light': '#F0EAE1',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      letterSpacing: {
        widest: '0.2em',
        boutique: '0.12em',
      },
    },
  },
  plugins: [],
};
