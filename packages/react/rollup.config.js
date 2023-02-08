import { babel } from '@rollup/plugin-babel'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import { rmdirSync } from 'fs'
import analyze from 'rollup-plugin-analyzer'
import sourcemaps from 'rollup-plugin-sourcemaps'
import { terser } from 'rollup-plugin-terser'

import packageJson from './package.json'

process
.env
.NODE_ENV = (
  'production'
)

rmdirSync(
  './dist',
  {
    recursive: true,
  },
)

const rollupConfig = {
  external: [
    'prop-types',
    'react',
    'react/jsx-runtime',
  ],
  input: (
    packageJson
    .source
  ),
  output: [
    {
      dir: (
        packageJson
        .module
      ),
      format: 'esm',
      preserveModules: true,
      sourcemap: true,
    },
    {
      dir: (
        packageJson
        .main
      ),
      exports: 'auto',
      format: 'cjs',
      preserveModules: true,
      sourcemap: true,
    },
    {
      file: (
        packageJson
        ['umd:main']
      ),
      format: 'umd',
      globals: {
        'prop-types': 'PropTypes',
        'react': 'React',
        'react/jsx-runtime': 'jsxRuntime',
      },
      name: 'OneForm',
      sourcemap: true,
    },
    {
      file: (
        packageJson
        .browser
      ),
      format: 'umd',
      globals: {
        'prop-types': 'PropTypes',
        'react': 'React',
        'react/jsx-runtime': 'jsxRuntime',
      },
      name: 'OneForm',
      plugins: [
        terser(),
      ],
      sourcemap: true,
    },
  ],
  plugins: [
    babel({
      babelHelpers: 'bundled',
    }),
    nodeResolve({
      moduleDirectories: [
        'src',
      ],
    }),
    sourcemaps(),
    analyze({
      limit: 3,
      summaryOnly: true,
    }),
  ],
}

export default rollupConfig
