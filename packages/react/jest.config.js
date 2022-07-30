const jestConfig = {
  clearMocks: true,
  rootDir: './src',
  setupFilesAfterEnv: [
    '<rootDir>/jest-setup.js',
  ],
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: [
    '/cypress/',
    '/node_modules/',
  ],
  transform: {
    '^.+\\.[jt]sx?$': [
      'babel-jest',
      {
        configFile: './babel.config.js',
      },
    ],
  },
  verbose: true,
}

module.exports = jestConfig
