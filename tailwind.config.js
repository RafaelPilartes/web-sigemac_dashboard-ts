/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '960px',
      xl: '1200px',

      'min-w-s-1390': '1390px',
      'min-w-s-1030': '1030px',
      'min-w-s-640': '640px',
      'min-w-s-900': '900px',
      'min-w-s-520': '520px',

      'max-w-s-1535': { max: '1535px' },
      'max-w-s-1030': { max: '1030px' },
      'max-w-s-960': { max: '960px' },
      'max-w-s-900': { max: '900px' },
      'max-w-s-840': { max: '840px' },
      'max-w-s-740': { max: '740px' },
      'max-w-s-640': { max: '640px' },
      'max-w-s-570': { max: '570px' },
      'max-w-s-520': { max: '520px' },
      'max-w-s-420': { max: '420px' },
      // => @media (max-width: 1535px) { ... }

      'min-w-768-max-w-s-1023': { min: '768px', max: '1023px' },
      // => @media (min-width: 768px and max-width: 1023px) { ... }

      'min-h-800': { raw: '(min-height: 800px)' }
      // => @media (min-height: 800px) { ... }
    },
    extend: {
      colors: {
        baseText: '#022147',
        baseDark: '#000F21',
        baseTextWhite: '#ffffff',
        baseTextGray: 'rgb(209 213 219)',

        baseTxtLight: '#FFFFFF',
        baseTxtDark: '#111827',
        baseBgLight: '#F1F5F9',
        baseBgDark: '#1A222C',
        light: '#FFFFFF',
        dark: '#24303F',

        secondary: {
          50: '#f3daf8',
          100: '#e6b2f0',
          200: '#af07cd',
          300: '#9e06b9',
          400: '#8c06a4',
          500: '#83059a',
          700: '#69047b',
          600: '',
          800: '#4f035c',
          900: '#3d0248'
        },
        primary: {
          50: '#dde9fb',
          100: '#b9d1f7',
          200: '#1d69e4',
          300: '#1a5fcd',
          400: '#1754b6',
          500: '#164fab',
          600: '',
          700: '#113f89',
          800: '#0d2f67',
          900: '#0a2550'
        }
      },
      boxShadow: {
        '3xl': '0 10px 40px -15px rgba(0, 0, 0, 0.1)',
        '4xl': '0 10px 40px -15px rgba(0, 0, 0, 0.2)'
      },
      backgroundImage: {
        login: 'url("/background/login-bg.jpg")',
        loginBg: 'url("/background/theme-9-bg.jpg")',
        squares: 'url("/background/squares.png")',
        homeQuote: 'url("/background/bg-1.jpg")',
        homeMinistry: 'url("/background/bg2.jpg")',
        footer: 'url("/background/footer-bg.jpg")'
      },
      animation: {
        'spin-slow': 'spin 6s linear infinite'
      }
    },
    fontFamily: {
      poppins: ['Poppins'],
      damion: ['Damion'],
      dancingScript: ['Dancing Script']
    }
  },
  plugins: [require('flowbite/plugin')]
}
