const nodeResolve = require("@rollup/plugin-node-resolve");
const { terser } = require("rollup-plugin-terser");
const babel = require("rollup-plugin-babel");

const minify = process.env.MINIFY !== "false";

module.exports = {
	input: "src/index.js",
	output: {
		dir: "dist",
		format: "iife",
		compact: minify,
		entryFileNames: `[name].js`,
		chunkFileNames: `[name]-[hash].js`
	},
	plugins: [
		babel({ exclude: /node_modules/ }),
		// @ts-ignore - nodeResolve doesn't export .default in cjs import
		nodeResolve({
			extensions: [".mjs", ".js", ".jsx", ".json", ".node"]
		}),
		minify ? terser() : null
	],
	watch: {
		clearScreen: false
	}
};
