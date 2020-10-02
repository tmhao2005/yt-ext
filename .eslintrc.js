module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint'
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    "eol-last": 2,
    "no-trailing-spaces": 2,
    "comma-dangle": ["error", "only-multiline"],
    "semi": 2,
    "camelcase": 2,
    "@typescript-eslint/no-explicit-any": 0,
    "@typescript-eslint/no-var-requires": 0,
    "@typescript-eslint/explicit-function-return-type": 0,
    "@typescript-eslint/no-use-before-define": 0
  }
};
