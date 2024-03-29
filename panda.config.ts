import { defineConfig } from '@pandacss/dev'
import { textStyles } from './inertia/styles/text-styles.js'
import { layerStyles } from './inertia/styles/layer-styles.js'

export default defineConfig({
  // Whether to use css reset
  preflight: true,
  presets: ['@pandacss/preset-base', '@pandacss/preset-panda'],

  // Where to look for your css declarations
  include: ['./inertia/**/*.{js,jsx,ts,tsx}'],

  // Files to exclude
  exclude: [],

  utilities: {
    color: {
      values: 'colors',
    },
  },

  // Useful for theme customization
  theme: {
    tokens: {
      colors: {
        purple: { value: '#D6ACFF' },
        blue: { value: '#778DFF' },
        cyan: { value: '#ACD7FF' },
        green: { value: '#AFFFC1' },
        yellow: { value: '#FEFFAB' },
        red: { value: '#FFB0B9' },
        darkred: { value: '#E09DA5' },
        gray: { value: '#E8E8E8' },
        lightgray: { value: '#F9F5F2' },
      },
      fonts: {
        body: { value: 'system-ui, sans-serif' },
      },
    },
    semanticTokens: {
      colors: {
        danger: { value: '{colors.red}' },
        warning: { value: '{colors.yellow}' },
        success: { value: '{colors.green}' },
        disabled: { value: '{colors.gray}' },
        background: { value: '{colors.lightgray}' },
      },
    },
    extend: { textStyles, layerStyles },
  },

  // The output directory for your css system
  outdir: 'styled-system',
  // cwd: "inertia"
})
