import cpy from "cpy";
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

	return cpy(src, "dist", { cwd: repoRoot(), parents: true });
}
