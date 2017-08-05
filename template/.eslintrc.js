// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  extends: ["plugin:vue-libs/recommended"],
  // required to lint *.vue files
  plugins: [
    'html'
  ]
}
