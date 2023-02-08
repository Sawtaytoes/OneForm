const { defineConfig } = require('cypress')

module
.exports = (
  defineConfig({
    e2e: {
      // We've imported your old cypress plugins here.
      // You may want to clean this up later by importing these.
      baseUrl: 'http://localhost:6006',
      setupNodeEvents: (
        on,
        config,
      ) => (
        require(
          './cypress/plugins/index.js'
        )(
          on,
          config,
        )
      ),
      specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
    },
    projectId: 'jf9xu1',
    viewportHeight: 660,
    viewportWidth: 400,
  })
)
