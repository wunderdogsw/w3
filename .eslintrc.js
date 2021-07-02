module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  plugins: ["prettier"],
  extends: ["react-app", "plugin:import/errors", "plugin:import/warnings", "plugin:prettier/recommended"],
  globals: {
    graphql: false,
  },
}
