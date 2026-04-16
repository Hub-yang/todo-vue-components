import antfu from '@antfu/eslint-config'

export default antfu({
  formatters: {
    html: true,
    markdown: false,
    css: true,
  },
  unocss: true,
  vue: true,
})
