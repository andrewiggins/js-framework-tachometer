const commonjsPlugin = require("@rollup/plugin-commonjs");
const nodeResolvePlugin = require("@rollup/plugin-node-resolve").default;
const babelPlugin = require("@rollup/plugin-babel").default;
const path = require("path");
const replace = require("@rollup/plugin-replace");
const terser = require("rollup-plugin-terser").terser;
const alias = require("@rollup/plugin-alias");

// const isProduction = process.env.production;
const isProduction = process.env.MINIFY !== "false";

const extensions = [".js", ".jsx"];

// see below for details on the options
const plugins = [
	nodeResolvePlugin({
		preferBuiltins: false,
		extensions: extensions,
	}),
	replace({
		// "process.env.NODE_ENV": isProduction
		// 	? JSON.stringify("production")
		// 	: JSON.stringify("development"),
		"process.env.NODE_ENV": JSON.stringify("production"),
		sourcemap: false,
	}),
	babelPlugin({
		babelHelpers: "bundled",
		exclude: "node_modules/**",
		sourceMaps: false,
	}),
	commonjsPlugin({
		sourceMap: false,
		extensions: extensions,
	}),
];

if (isProduction) {
	plugins.push(
		terser({
			parse: {
				ecma: 8,
			},
			compress: {
				ecma: 5,
				inline: true,
				if_return: false,
				reduce_funcs: false,
				passes: 5,
				comparisons: false,
			},
			output: {
				ecma: 5,
				comments: false,
			},
			toplevel: true,
			module: true,
		})
	);
}

// When in development, we want to use dev build of inferno.
// DEV build has helper functionalities build for development only.
// When we are shipping to production we don't want those checks to be included
plugins.unshift(
	alias({
		resolve: extensions,
		inferno:
			__dirname +
			"/node_modules/inferno/dist/" +
			(isProduction ? "index.esm.js" : "index.dev.esm.js"),
	})
);

export default {
	input: path.join(__dirname, "src/index.js"),
	output: {
		name: "inferno",
		format: "es",
		file: path.join(__dirname, "dist", "index.js"),
		sourcemap: false,
	},
	plugins: plugins,
};
