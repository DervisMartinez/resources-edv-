/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        sans: ['Montserrat', 'sans-serif'],
      },
      colors: {
        // Paleta oficial "ACOMPAÑAMIENTO" de Empresas Del Valle
        'edv-white': '#FFFFFF',
        'edv-surface': '#FBFBF5',
        'edv-sand': '#CFCDBC',
        'edv-slate': '#B4BCC8',
        'edv-steel': '#40606E',
        'edv-teal-navy': '#1A3441',
        'edv-midnight': '#092332',
        'edv-royal-navy': '#1F2E54',

        // Brand Aliases
        'brand-primary': '#092332',
        'brand-accent': '#1F2E54',
        'brand-secondary': '#40606E',
        'brand-light': '#FBFBF5',
        'brand-neutral': '#CFCDBC',
        'brand-muted': '#B4BCC8',
        'brand-dark': '#1A3441',
      },
      backgroundImage: {
        'edv-gradient-hero': 'linear-gradient(135deg, #092332 0%, #1F2E54 45%, #1A3441 75%, #40606E 100%)',
        'edv-gradient-vibrant': 'linear-gradient(145deg, #1F2E54 0%, #224375 35%, #1A3441 70%, #092332 100%)',
      }
    },
  },
  plugins: [],
}
