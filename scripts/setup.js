const path = require("path");
const { resolveFrameworkSpec } = require("./lib/frameworks");
const { runNode, toCompletion } = require("./lib/node");

/**
 * @param {string[]} specs
 * @param {import('./index').CmdLineOptions} options
 */
async function setup(specs, options) {
	if (!process.env.npm_execpath) {
		throw new Error(
			"Please execute this task using 'npm run setup' or manually set the 'npm_execpath' environment variable"
		);
	}

	console.log("Resolving specified frameworks...");
	// @ts-ignore
	const pkgPaths = (await Promise.all(specs.map(resolveFrameworkSpec))).flat();
	console.log("Resolved to:", pkgPaths);

	const tasks = pkgPaths.map(pkgPath => {
		const cwd = path.dirname(pkgPath);
		console.log(`Running npm install in ${cwd}...`);

		return toCompletion(
			runNode(process.env.npm_execpath, ["install", "--quiet"], {
				cwd,
				stdio: ["ignore"], // TODO: Parse stdout and stderr into something meaningful and show to user
				debug: options.debug
			})
		).finally(() => {
			console.log(`Finished installing ${cwd}`);
		});
	});

	return Promise.all(tasks);
}

module.exports = {
	setup
};
