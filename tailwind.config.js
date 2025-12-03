// tailwind.config.js
import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        foodieTheme: {
          "primary": "#f97316",
          "secondary": "#22c55e",
          "accent": "#fcd34d",
          "neutral": "#1f2937",
          "base-100": "#fff7ed",
          "info": "#38bdf8",
          "success": "#22c55e",
          "warning": "#facc15",
          "error": "#ef4444",
        },
      },
      "light",
    ],
  },
};
