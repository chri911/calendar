module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  rules: {
    'no-unused-vars': 'warn',
    'react/prop-types': 'warn',
    'no-trailing-spaces': 'warn',
    'jsx-a11y/no-autofocus': 0,
    'jsx-a11y/label-has-associated-control': 0,
    'object-curly-newline': [2, {
      ObjectExpression: {
        consistent: true,
        minProperties: 4,
      },
    }],
  },
};