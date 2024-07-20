import type { Config } from 'tailwindcss'

export default {
  content: ['./app/**/*.{ts,tsx}', './content/**/*.mdx', './public/**/*.svg'],
  theme: {
    fontFamily: {
      sans: ['"PT Sans"', 'sans-serif'],
      roboto: ['Roboto', 'sans-serif'],
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [],
} satisfies Config
