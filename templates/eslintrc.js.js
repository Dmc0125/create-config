module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    semi: ['error', 'never'],
    'import/prefer-default-export': 0,
    'lines-between-class-members': 0,
    'no-await-in-loop': 0,
    'no-useless-constructor': 0,
    'no-unused-vars': 'warn',
    'no-empty-function': 0,
    'no-continue': 0,
    'max-len': ['error', { code: 100 }],
    'no-underscore-dangle': 0,
  },
}
