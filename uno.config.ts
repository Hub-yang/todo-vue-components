import { defineConfig, presetAttributify, presetUno } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
  ],
  content: {
    pipeline: {
      include: [
        /\.(vue|[jt]sx?)($|\?)/,
        'packages/**/*.{js,ts,jsx,tsx,vue}',
        'play/**/*.{js,ts,jsx,tsx,vue}',
      ],
    },
  },
})
