const jestConfig = {
  clearMocks: true,
  rootDir: './src',
  setupFilesAfterEnv: [
    '<rootDir>/jest-setup.js',
  ],
  testPathIgnorePatterns: [
    '/cypress/',
    '/node_modules/',
  ],
  verbose: true,
}

module.exports = jestConfig
