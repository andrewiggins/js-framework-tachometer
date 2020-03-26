const cpy = require("cpy");
const { repoRoot } = require("./lib/paths");

/**
 * @param {never} _
 * @param {import('./index').CmdLineOptions} options
 */
async function publish(_, options) {
	const src = [
		"node_modules/afterframe/dist/*",
		"node_modules/spectre.css/dist/*",
		"frameworks/*/*/dist/**/*",
		"frameworks/*/*/benches/**/*",
		"benches/**/*",
		"bench.js",
		"index.html"
	];

	return cpy(src, "dist", { cwd: repoRoot(), parents: true });
}

module.exports = {
	publish
};
