/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/renderer/**/*.{html,js,ts,tsx}", // 指向渲染进程文件
  ],
  theme: {
    extend: {},
  },
  plugins: [require('tailwindcss-animate')],
}
