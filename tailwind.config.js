/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./dist/**/*.html",
    "./*.js",
    "./src/**/*.js"
  ],
  theme: {
    extend: {
      // 2. 字体收编：把 HTML 脚本里那段搬过来
      fontFamily: {
        'nothingyoucoulddo': ['Nothing You Could Do', 'cursive'],
        'signika': ['Signika', 'sans-serif'],
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      },
      animation: {
        'fade-in': 'fade-in 1.2s ease-out forwards',
      }
    },
  },
  plugins: [],
}