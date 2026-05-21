/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        /** RukaPay brand — main: #08113d */
        accent: {
          50: '#eef1f8',
          100: '#dce2f0',
          200: '#b9c5e1',
          300: '#8fa0cb',
          400: '#5f75b0',
          500: '#3a5090',
          600: '#08113d',
          700: '#060e31',
          800: '#040a25',
          900: '#020618',
        },
        primary: {
          50: '#eef1f8',
          100: '#dce2f0',
          200: '#b9c5e1',
          300: '#8fa0cb',
          400: '#5f75b0',
          500: '#3a5090',
          600: '#0c1a52',
          700: '#0a1545',
          800: '#09123c',
          900: '#08113d',
          950: '#08113d',
        },
        surface: {
          DEFAULT: 'var(--surface)',
          elevated: 'var(--surface-elevated)',
          muted: 'var(--surface-muted)',
        },
        border: {
          DEFAULT: 'var(--border)',
          subtle: 'var(--border-subtle)',
        },
        content: {
          DEFAULT: 'var(--content)',
          muted: 'var(--content-muted)',
          subtle: 'var(--content-subtle)',
        },
        code: {
          bg: 'var(--code-bg)',
          border: 'var(--code-border)',
        },
      },
      fontFamily: {
        sans: ['var(--font-outfit)', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      maxWidth: {
        prose: '42rem',
        docs: '48rem',
      },
      boxShadow: {
        soft: '0 1px 2px 0 rgb(0 0 0 / 0.04)',
        card: '0 1px 3px 0 rgb(0 0 0 / 0.06), 0 1px 2px -1px rgb(0 0 0 / 0.06)',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(4px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}
