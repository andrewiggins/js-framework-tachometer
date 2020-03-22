const path = require("path");
const { resolveFrameworkSpec } = require("./lib/frameworks");
const { runNpm, ensureNpmPathSet, toCompletion } = require("./lib/node");

/**
 * @param {string[]} specs The frameworks requested by the user on the command line
 * @param {import('./index').CmdLineOptions} options
 */
async function setup(specs, options) {
	if (!specs || specs.length == 0) {
		throw new Error(
			"Expected argument 'frameworks' to be non-null. Run `node ./scripts --help` for guidance."
		);
	}

	ensureNpmPathSet();

	console.log("Resolving specified frameworks...");
	// @ts-ignore
	const pkgPaths = (await Promise.all(specs.map(resolveFrameworkSpec))).flat();
	console.log("Resolved to:", pkgPaths);

	const tasks = pkgPaths.map(async pkgPath => {
		const cwd = path.dirname(pkgPath);
		const name = path.basename(cwd);
		const npmOptions = { cwd, debug: options.debug };

		console.log(`${name}: Running npm install... (0/2)`);
		await toCompletion(runNpm(["install", "--quiet"], npmOptions));
		console.log(`${name}: Finished installing (1/2)`);

		console.log(`${name}: Building bundle... (1/2)`);
		await toCompletion(runNpm(["run", "build:prod"], npmOptions));
		console.log(`${name}: Finished building (2/2)`);
	});

	return Promise.all(tasks);
}

module.exports = {
	setup
};
