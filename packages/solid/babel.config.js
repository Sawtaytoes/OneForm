const babelConfig = {
	env: {
		development: {
			plugins: [],
			presets: [
				[
					'@babel/preset-env',
					{
						modules: false,
						useBuiltIns: false,
					},
				],
				'babel-preset-solid',
			],
		},

		production: {
			plugins: [],
			presets: [
				[
					'@babel/preset-env',
					{
						modules: false,
						useBuiltIns: false,
					},
				],
				'babel-preset-solid',
			],
		},

		test: {
			plugins: [],
			presets: [
				[
					'@babel/preset-env',
					{
						modules: 'auto',
						useBuiltIns: false,
					},
				],
				'babel-preset-solid',
			],
		},
	},
}

module.exports = babelConfig
