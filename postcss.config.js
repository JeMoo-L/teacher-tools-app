module.exports = {
  plugins: {
    '@tailwindcss/postcss': {
      config: './tailwind.config.js' // 显式指定配置路径
    },
    autoprefixer: {},
  },
}
