import { nextui } from "@nextui-org/react"
import type { Config } from "tailwindcss"

import baseConfig from "@bbs/tailwind-config"

export default {
  content: [
    "./src/**/*.{ts,tsx}",
    "../../node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  presets: [baseConfig],
  darkMode: "class",
  plugins: [nextui()],
  theme: {
    screens: {
      xs: "520px",
    },
  },
} satisfies Config
