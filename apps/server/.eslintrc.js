module.exports = {
  root: true,
  ...require('eslint-config/server'),
  parserOptions: {
    root: true,
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },
}
