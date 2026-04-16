import { defineConfig, presetAttributify, presetWind3 } from 'unocss'

export default defineConfig({
  presets: [
    presetWind3(),
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
