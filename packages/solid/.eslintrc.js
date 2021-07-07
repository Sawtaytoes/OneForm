const eslintConfig = {
  env: {
    'cypress/globals': true,
    'jest/globals': true,
  },
  extends: [
    'plugin:cypress/recommended',
    'plugin:jest/recommended',
    'plugin:jest/style',
    '@ghadyani-eslint/node',
    '@ghadyani-eslint/web',
  ],
  plugins: [
    'cypress',
    'jest',
  ],
  rules: {
    '@getify/proper-ternary/nested': 'off',
    '@ghadyani-eslint/arrow-body-parens/parens': 'off', // TEMP. Remove 'off' when fixed in @ghadyani-eslint
    'array-bracket-newline': [
      'warn',
      {
        minItems: 1,
        multiline: true,
      },
    ],
    'arrow-parens': [
      'warn',
      'always',
    ],
    'import/no-unresolved': [
      'warn',
      {
        caseSensitive: false,
        ignore: [
          '\\$',
        ],
      },
    ],
    'indent': 'off', // TEMP. Remove 'off' when fixed in @ghadyani-eslint
    'no-unexpected-multiline': 'off',
    'react/react-in-jsx-scope': 'off',
  },
  settings: {},
}

module.exports = eslintConfig
