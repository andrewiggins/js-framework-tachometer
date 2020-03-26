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

	console.log(`Resolving frameworks that match: ${specs.join(", ")}...`);
	// @ts-ignore
	const pkgPaths = (await Promise.all(specs.map(resolveFrameworkSpec))).flat();
	console.log("Resolved to:", pkgPaths);

	let i = 0;
	const n = pkgPaths.length;
	console.log("Beginning setup. Estimated install tasks:", n);

	const tasks = pkgPaths.map(async pkgPath => {
		const cwd = path.dirname(pkgPath);
		const name = path.basename(cwd);
		const npmOptions = { cwd, debug: options.debug };

		console.log(`${name}: Running npm install...`);
		await toCompletion(runNpm(["install", "--quiet"], npmOptions));
		console.log(`${name}: Finished installing (${++i}/${n})`);
	});

	return Promise.all(tasks);
}

module.exports = {
	setup
};
