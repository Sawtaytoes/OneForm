const jestConfig = {
	clearMocks: true,
	preset: 'solid-jest/preset/browser',
	rootDir: './src',
	testPathIgnorePatterns: [
		'/cypress/',
		'/node_modules/',
	],
	verbose: true,
}

module.exports = jestConfig
