module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: ['standard', 'prettier', 'plugin:prettier/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'no-unused-vars': 'off',
    'no-use-before-define': 'off',
  },
}
