import { babel } from '@rollup/plugin-babel'
import nodeResolve from '@rollup/plugin-node-resolve'
import analyze from 'rollup-plugin-analyzer'
import sourcemaps from 'rollup-plugin-sourcemaps'
import { terser } from 'rollup-plugin-terser'

import packageJson from './package.json'

process.env.NODE_ENV = 'production'

const rollupConfig = {
	external: [
		'prop-types',
		'react',
	],
	input: (
		packageJson
		.source
	),
	output: [
		{
			file: (
				packageJson
				.module
			),
			format: 'es',
			sourcemap: true,
		},
		{
			file: (
				packageJson
				.main
			),
			format: 'cjs',
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
