const jestConfig = {
  clearMocks: true,
  rootDir: './src',
	// slient: false,
	testPathIgnorePatterns: [
		'/cypress/',
		'/node_modules/',
	],
	verbose: true,
}

module.exports = jestConfig
