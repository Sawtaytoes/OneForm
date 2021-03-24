import { babel } from '@rollup/plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import analyze from 'rollup-plugin-analyzer'
import sourcemaps from 'rollup-plugin-sourcemaps'
// import { terser } from 'rollup-plugin-terser'

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
				.browser
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
				.module
			),
			format: 'esm',
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
		// {
		// 	file: 'dist/oneform.min.iife.js',
		// 	format: 'iife',
		// 	name: 'OneForm',
		// 	plugins: [
		// 		terser(),
		// 		gzipPlugin(),
		// 	],
		// 	sourcemap: true,
		// },
	],
	plugins: [
		babel({
			babelHelpers: 'bundled',
		}),
		resolve({
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
