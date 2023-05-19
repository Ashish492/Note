module.exports = {
  ...require('eslint-config/client'),
  root: true,
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: './tsconfig.json',
  },
  // extends: ['eslint-config/client'],
}
