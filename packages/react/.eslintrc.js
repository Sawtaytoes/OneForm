const eslintConfig = {
  env: {
    'cypress/globals': true,
    'jest/globals': true,
  },
  extends: [
    'plugin:cypress/recommended',
    'plugin:jest/recommended',
    'plugin:jest/style',
    'plugin:react-hooks/recommended',
    '@ghadyani-eslint/node',
    '@ghadyani-eslint/react',
  ],
  parser: '@babel/eslint-parser',
  parserOptions: {
    babelOptions: {
      configFile: (
        require
        .resolve(
          './babel.config.js',
        )
      ),
    },
  },
  plugins: [
    'cypress',
    'jest',
    'react-hooks',
  ],
  rules: {
    '@getify/proper-ternary/nested': 'off',
    '@ghadyani-eslint/arrow-body-parens/parens': 'off',
    '@ghadyani-eslint/eslint-overrides/indent': 'off',
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
    'react-hooks/exhaustive-deps': 'warn',
    'react-hooks/rules-of-hooks': 'error',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}

module.exports = eslintConfig
