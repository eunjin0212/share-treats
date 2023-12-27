module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    // "plugin:vue/vue3-essential",
    "plugin:vue/essential",
    "eslint:recommended",
  ],
  parserOptions: {
    parser: "@babel/eslint-parser",
    requireConfigFile: false,
  },
  rules: {
    'no-console': [
      process.env.NODE_ENV === 'production' ? 'error' : 'off',
      { allow: ['error'] }
    ],
    "no-unused-vars": "warn",
    "vue/multi-word-component-names": "off"
  },
}