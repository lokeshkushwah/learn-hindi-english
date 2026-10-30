/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        hindi: ['var(--font-devanagari)', '"Noto Sans Devanagari"', '"Nirmala UI"', 'Mangal', 'sans-serif'],
        display: ['var(--font-fredoka)', 'system-ui', 'sans-serif'],
      },
      colors: {
        kid: {
          yellow: '#FFDE59',
          orange: '#FF914D',
          pink: '#FF66C4',
          purple: '#8C52FF',
          blue: '#5CE1E6',
          green: '#7ED957',
          sky: '#38B6FF',
          cream: '#FFF9E6',
        }
      },
      borderWidth: {
        '3': '3px',
      },
      scale: {
        '102': '1.02',
      },
      boxShadow: {
        'bubbly': '0 8px 0 rgba(0,0,0,0.08)',
        'bubbly-hover': '0 12px 0 rgba(0,0,0,0.12)',
        'bubbly-active': '0 2px 0 rgba(0,0,0,0.08)',
      }
    },
  },
  plugins: [],
};
