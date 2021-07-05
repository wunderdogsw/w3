module.exports = {
  parser: "babel-eslint",
  settings: {
    react: {
      version: "detect",
    },
  },
  env: {
    node: true,
  },
  plugins: ["prettier"],
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:jsx-a11y/recommended",
    "plugin:prettier/recommended",
  ],
  globals: {
    graphql: false,
  },
  rules: {
    "react/prop-types": "off",
    "no-undef": "warn",
  },
}
