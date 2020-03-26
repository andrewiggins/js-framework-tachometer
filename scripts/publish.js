const cpy = require("cpy");
const ghPages = require("gh-pages");
const { repoRoot } = require("./lib/paths");

/**
 * @param {never} _
 * @param {import('./index').CmdLineOptions} options
 */
async function publish(_, options) {
	// if (options.clean) {
	// 	ghPages.clean();
	// 	return;
	// }

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

	// return ghPublish(repoRoot(), {
	// 	src,
	// 	push: !options.debug
	// });
}

/**
 *
 * @param {string} dir
 * @param {import('gh-pages').PublishOptions} options
 */
function ghPublish(dir, options) {
	return new Promise((resolve, reject) => {
		ghPages.publish(dir, options, error => {
			if (error) {
				reject(error);
			} else {
				resolve();
			}
		});
	});
}

module.exports = {
	publish
};
