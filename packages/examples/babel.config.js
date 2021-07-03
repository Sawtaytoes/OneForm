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
      plugins: [],
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
      plugins: [],
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
