import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary:"#2563eb",
        success:"#27AE60",
        error:"#E74C3C",
        upcoming:"#3498DB",
        light:"#374151",
        grayBg:"#e5e7eb",
        primaryBg:"#3b82f6"
      },
    },
  },
  plugins: [],
} satisfies Config;
