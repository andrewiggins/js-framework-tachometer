const nodeResolve = require("@rollup/plugin-node-resolve");
const { terser } = require("rollup-plugin-terser");
const babel = require("rollup-plugin-babel");

const minify = process.env.MINIFY !== "false";
const extension = minify ? ".min.js" : ".js";

module.exports = {
	input: "src/index.js",
	output: {
		dir: "dist",
		format: "iife",
		compact: minify,
		entryFileNames: `[name]${extension}`,
		chunkFileNames: `[name]-[hash]${extension}`
	},
	plugins: [
		babel({ exclude: /node_modules/ }),
		nodeResolve({
			extensions: [".mjs", ".js", ".jsx", ".json", ".node"]
		}),
		minify ? terser() : null
	],
	watch: {
		clearScreen: false
	}
};
