/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      maxWidthText: "810px",
      minHeight: "554px",
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },

    extend: {
      screens: {
        xs: "320px",
        md: "768px",
        lg: "1024px",
      },

      spacing: {
        72: "4.5rem",
        7: "7px",
        120: "120px",
      },
      maxWidth: {
        text: "811px",
        accor: "1040px",
        title: "856px",
        690: "690px",
      },
      lineHeight: {
        120: "281.6px",
      },
      colors: {
        border: "var(--border)",
        customBlue: "rgba(26, 53, 96, 0.70)",
        customCart: "rgba(255, 255, 255, 0.60)",
        customGrays: "rgba(255, 255, 255, 0.70)",
        customGreyscale: "#E5E5E5",
        customSilver: "#737373",
        customBlack: "#0A0A0A",
        customBlue: "#1A3560",
        customGray: "#FAFAFA",
        gray: "var(--gray)",
        ["gray-2"]: "var(--gray-2)",
        input: "var(--input)",
        ring: "var(--ring)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
          darker: "var(--primary-darker)",
          dark: "var(--primary-dark)",
          light: "var(--primary-light)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
