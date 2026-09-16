/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        agri: {
          50: "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#22c55e",
          600: "#16a34a", // Primary Accent
          700: "#15803d", // Primary Accent Hover
          800: "#166534",
          900: "#14532d",
        },
        slate: {
          50: "#f8fafc", // Canvas Background
          100: "#f1f5f9",
          200: "#e2e8f0", // Borders & Dividers
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569", // Secondary Text
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a", // Primary Text
        },
        alert: {
          50: "#fef2f2",
          100: "#fee2e2", // Alert Tint
          500: "#ef4444",
          600: "#dc2626", // Solid Crimson Bounding Box & Alert
          700: "#b91c1c",
        },
      },
    },
  },
  plugins: [],
};
