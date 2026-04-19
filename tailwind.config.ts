import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: '#FF6B35',
          'orange-accessible': '#FF804F',
          'orange-dark': '#E55A25',
        },
        bg: {
          deep: '#0A0A12',
          dark: '#0F0D1A',
          card: '#1A1426',
        },
        court: {
          floor: '#D7AD6B',
        },
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"SF Pro Rounded"',
          'Inter',
          'system-ui',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
}

export default config
