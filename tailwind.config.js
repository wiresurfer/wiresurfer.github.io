/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./docs/**/*.{html,md}",
    "./overrides/**/*.html",
    "./docs/blog/**/*.md",
  ],
  theme: {
    extend: {
      colors: {
        accent: '#ff9800',
      },
      spacing: {
        'xs': '0.25rem',   // 4px
        'sm': '0.5rem',    // 8px
        'md': '1rem',      // 16px
        'lg': '1.5rem',    // 24px
        'xl': '2rem',      // 32px
        '2xl': '3rem',     // 48px
      },
    },
  },
  plugins: [],
  // Enable JIT mode for on-demand compilation
  mode: 'jit',
  // Purge unused styles in production
  purge: {
    enabled: true,
    content: [
      "./docs/**/*.{html,md}",
      "./overrides/**/*.html",
      "./docs/blog/**/*.md",
    ],
  },
}
