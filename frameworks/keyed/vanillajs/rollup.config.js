// import babel from 'rollup-plugin-babel';
import { terser } from "rollup-plugin-terser";

const plugins = [
	// babel({
	// 	presets: [["@babel/preset-env", {
	//     "targets": {
	//       "ie": "11"
	//     }
	//   }]]
	// })
];

if (process.env.MINIFY !== "false") {
	plugins.push(terser());
}

export default {
	input: "src/Main.js",
	output: {
		file: "dist/index.js",
		format: "es"
	},
	plugins
};
