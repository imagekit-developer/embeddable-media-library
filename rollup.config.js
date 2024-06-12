import { babel } from '@rollup/plugin-babel';
import json from '@rollup/plugin-json';
import pkg from './package.json';
import styles from 'rollup-plugin-styles';
import terser from '@rollup/plugin-terser';
import typescript from 'rollup-plugin-ts';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default [
	// browser-friendly UMD build
	{
		input: 'src/index.ts',
		external: ['src/styles.css'],
		plugins: [
			typescript({
				hook: {
					outputPath: (path, kind) => {
						return kind === "declaration" ? pkg.types : path
					}
				},
			}),
			nodeResolve(),
			babel({ babelHelpers: 'bundled' }),
			terser(),
			json(),
			styles(),
		],
		context: 'this',
		output: {
			file: pkg.browser,
			format: 'umd',
			name: 'ImagekitMediaLibraryWidget',
			esModule: false,
			sourcemap: true,
		},
	},
	// CommonJS (for Node) and ES module (for bundlers) build.
	// (We could have three entries in the configuration array
	// instead of two, but it's quicker to generate multiple
	// builds from a single configuration where possible, using
	// an array for the `output` option, where we can specify
	// `file` and `format` for each target)
	{
		input: 'src/index.ts',
		external: ['src/styles.css'],
		plugins: [
			typescript({
				hook: {
					outputPath: (path, kind) => {
						return kind === "declaration" ? pkg.types : path
					}
				},
			}),
			nodeResolve(),
			babel({ babelHelpers: 'bundled' }),
			terser(),
			json(),
			styles()
		],
		output: [
			{
				file: pkg.module,
				format: 'esm',
				sourcemap: true,
			},
			{
				file: pkg.main,
				format: 'cjs',
				sourcemap: true,
			}],
	},
];