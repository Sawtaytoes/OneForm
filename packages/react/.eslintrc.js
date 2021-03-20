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
		'react-hooks',
	],
	rules: {
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
