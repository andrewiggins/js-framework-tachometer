const path = require("path");
const { repoRoot, getFrameworkBenchFiles } = require("./lib/paths");
const {
	resolveFrameworkSpec,
	createFrameworkData
} = require("./lib/frameworks");
const { runNode, toCompletion } = require("./lib/node");

/**
 * @param {string[]} specs The frameworks requested by the user on the command line
 * @param {import('./index').CmdLineOptions} options
 */
async function bench(specs, options) {
	if (!specs || specs.length == 0) {
		specs = ["built"];
	}

	console.log("Resolving specified frameworks...");

	// @ts-ignore
	const pkgPaths = (await Promise.all(specs.map(resolveFrameworkSpec))).flat();
	const frameworks = await Promise.all(pkgPaths.map(createFrameworkData));

	console.log("Resolved to:", pkgPaths);
	console.log("Resolving benchmarks to run...");

	// TODO: Implement bench option
	const benchmarks = await getFrameworkBenchFiles(frameworks);
	const benchIds = Array.from(benchmarks.keys());

	console.log("Resolved to:", benchIds);

	const tachBin = repoRoot("node_modules/tachometer/bin/tach.js");

	for (let benchId of benchIds) {
		console.log(`${benchId}: Running benchmark...`);

		const htmlFiles = benchmarks.get(benchId);
		const args = htmlFiles;

		await runNode(tachBin, args);

		console.log(`${benchId}: Finished running benchmark`);
	}
}

module.exports = {
	bench
};
