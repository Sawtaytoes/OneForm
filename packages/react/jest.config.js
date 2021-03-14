const jestConfig = {
  clearMocks: true,
  rootDir: './src',
	testPathIgnorePatterns: [
		'/cypress/',
		'/node_modules/',
	],
	verbose: true,
}

module.exports = jestConfig
