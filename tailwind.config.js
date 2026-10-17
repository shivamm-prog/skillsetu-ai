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
        gold: {
          50: '#FDFBF5',
          100: '#F9F4E8',
          200: '#F2E5C6',
          300: '#E7CE97',
          400: '#DBB565',
          500: '#CA9A36',
          600: '#B28026',
          700: '#8E621C',
          800: '#734E1A',
          900: '#5E3F18',
        },
        charcoal: {
          700: '#2A2E37',
          750: '#23262E',
          800: '#1C1F26',
          850: '#16181F',
          900: '#111318',
          950: '#0C0D11',
        },
        cream: {
          50: '#FCFBF7',
          100: '#F7F3EA',
          200: '#EFE9DC',
          300: '#E3D9C4',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Manrope', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 10px -2px rgba(27, 28, 30, 0.05), 0 1px 3px 0 rgba(27, 28, 30, 0.03)',
        'premium': '0 8px 28px -6px rgba(27, 28, 30, 0.08), 0 2px 6px -1px rgba(27, 28, 30, 0.04)',
        'elevated': '0 16px 36px -8px rgba(27, 28, 30, 0.12), 0 4px 10px -2px rgba(27, 28, 30, 0.06)',
      }
    },
  },
  plugins: [],
}
