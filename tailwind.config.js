module.exports = {
  purge: ["./pages/**/*.js", "./pages/**/*.jsx"],
  theme: {
    fontFamily: {
      sans: ["Roboto", "sans-serif"],
    },
    extend: {},
  },
  variants: {},
  plugins: [require("@tailwindcss/ui")],
  future: {
    purgeLayersByDefault: true,
    removeDeprecatedGapUtilities: true,
  },
};
