import babel from '@rollup/plugin-babel';
import json from '@rollup/plugin-json';
import pkg from './package.json';
import styles from "rollup-plugin-styles";
import { terser } from "rollup-plugin-terser";

export default [
	// browser-friendly UMD build
	{
		input: 'src/index.js',
		external: ['src/styles.css'],
		output: {
			name: 'ImageKitEML',
			file: pkg.browser,
			format: 'umd'
		},
		plugins: [
			babel(),
			json(),
			terser(),
			styles(),
		],
	},
	// CommonJS (for Node) and ES module (for bundlers) build.
	// (We could have three entries in the configuration array
	// instead of two, but it's quicker to generate multiple
	// builds from a single configuration where possible, using
	// an array for the `output` option, where we can specify
	// `file` and `format` for each target)
	{
		input: 'src/index.js',
		external: ['src/styles.css'],
		output: [
			{ file: pkg.main, format: 'cjs' },
			{ file: pkg.module, format: 'es' },
		],
		plugins: [
			json(),
			styles(),
		]
	}
];