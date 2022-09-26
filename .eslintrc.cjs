module.exports = {
	env: {
		node: true,
	},
	extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 2022,
	},
	plugins: ['@typescript-eslint'],
	rules: {
		semi: ['error', 'never'],
		'comma-dangle': ['error', 'always-multiline'],
	},
}
