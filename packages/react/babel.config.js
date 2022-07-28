const babelConfig = {
  env: {
    development: {
      presets: [
        [
          '@babel/preset-typescript',
        ],
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
          '@babel/preset-typescript',
        ],
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
          '@babel/preset-typescript',
        ],
        [
          '@babel/preset-env',
          {
            modules: 'commonjs',
            useBuiltIns: false,
            targets: {
              node: 'current',
            },
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
