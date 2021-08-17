const jestConfig = {
  clearMocks: true,
  rootDir: './src',
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: [
    '/cypress/',
    '/node_modules/',
  ],
  verbose: true,
}

module.exports = jestConfig
