/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        'roofing-orange': '#F97316',
        'roofing-orange-dark': '#EA580C',
      },
      keyframes: {
        "hammer-swing": {
          "0%": { transform: "rotate(0deg)" },
          "30%": { transform: "rotate(-20deg)" },
          "60%": { transform: "rotate(15deg)" },
          "100%": { transform: "rotate(0deg)" },
        },
        "bounce-subtle": {
          "0%, 100%": { transform: "translateY(-5%)" },
          "50%": { transform: "translateY(0)" },
        },
        "slide-up-fade": {
          "0%": { transform: "translateY(10px)", opacity: 0 },
          "100%": { transform: "translateY(0)", opacity: 1 },
        },
        "pulse-subtle": {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.7 },
        }
      },
      animation: {
        "hammer-swing": "hammer-swing 1.2s ease-in-out infinite",
        "bounce-subtle": "bounce-subtle 2s ease-in-out infinite",
        "slide-up-fade": "slide-up-fade 0.3s ease-out",
        "pulse-subtle": "pulse-subtle 2s ease-in-out infinite",
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'chat-pattern': 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23f97316\' fill-opacity=\'0.03\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'3\' cy=\'3\' r=\'3\'/%3E%3C/g%3E%3C/svg%3E")',
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
}
