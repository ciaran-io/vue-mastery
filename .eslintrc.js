module.exports = {
	root: true,
	env: {
		es2021,
	},
	extends: [
		// add more generic rulesets here, such as:
		// 'eslint:recommended',
		'eslint:recommended',
		'plugin:vue/vue3-recommended',

		// 'plugin:vue/recommended' // Use this if you are using Vue.js 2.x.
		'prettier',
	],
	rules: {
		// override/add rules settings here, such as:
		// 'vue/no-unused-vars': 'error'
	},
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
};
