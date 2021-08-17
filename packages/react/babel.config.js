const babelConfig = {
  env: {
    development: {
      presets: [
        [
          '@babel/preset-env',
          {
            modules: false,
            useBuiltIns: false,
          },
        ],
        [
          '@babel/preset-react',
          {
            development: true,
            runtime: 'automatic',
          },
        ],
      ],
    },

    production: {
      presets: [
        [
          '@babel/preset-env',
          {
            modules: false,
            useBuiltIns: false,
          },
        ],
        [
          '@babel/preset-react',
          {
            development: false,
            runtime: 'automatic',
          },
        ],
      ],
    },

    test: {
      presets: [
        [
          '@babel/preset-env',
          {
            modules: 'auto',
            useBuiltIns: false,
          },
        ],
        [
          '@babel/preset-react',
          {
            development: true,
            runtime: 'automatic',
          },
        ],
      ],
    },
  },
}

module.exports = babelConfig
