import cpy from "cpy";
import { rollup } from "rollup";
import { repoRoot } from "./lib/paths.js";

/**
 * @param {never} _
 * @param {import('./index').CmdLineOptions} options
 */
export async function publish(_, options) {
	const src = [
		"node_modules/afterframe/dist/*",
		"node_modules/spectre.css/dist/*",
		"frameworks/*/*/dist/**/*",
		"frameworks/*/*/benches/**/*",
		"index.html"
	];

	await cpy(src, "dist", { cwd: repoRoot(), parents: true });

	const bundle = await rollup({
		input: repoRoot("frameworks/util.js")
	});

	await bundle.write({
		file: repoRoot("dist/frameworks/util.js"),
		format: "esm",
		sourcemap: false,
		preferConst: true
	});
}
