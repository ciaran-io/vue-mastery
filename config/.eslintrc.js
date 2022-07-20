module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    // add more generic rulesets here, such as:
    '.eslintrc-auto-import.json',
    'eslint:recommended',
    'plugin:vue/vue3-strongly-recommended',
    // 'plugin:vue/recommended' // Use this if you are using Vue.js 2.x.
    'prettier',
  ],
  rules: {
    // override/add rules settings here, such as:
    // 'vue/no-unused-vars': 'error'
    'vue/multi-word-component-names': [
      'error',
      {
        ignores: ['Home', 'Forum', 'Category', 'Profile'],
      },
    ],
  },
  parserOptions: {
    ecmaVersion: 'latest',
  },
};
