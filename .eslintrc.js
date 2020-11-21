module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: ["react-app", "plugin:import/errors", "plugin:import/warnings"],
  globals: {
    graphql: false,
  },
}
