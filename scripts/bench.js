import { repoRoot } from "./lib/paths.js";
import { resolveFrameworkSpec, createFrameworkData } from "./lib/frameworks.js";
import { resolveBenchSpec, getFrameworkBenchFiles } from "./lib/benches.js";
import { runNode, toCompletion } from "./lib/node.js";

/**
 * @param {string[]} specs The frameworks requested by the user on the command line
 * @param {import('./index').CmdLineOptions} options
 */
export async function bench(specs, options) {
	if (!specs || specs.length == 0) {
		specs = ["built"];
	}

	let benchSpecs;
	if (options.bench) {
		benchSpecs = Array.isArray(options.bench) ? options.bench : [options.bench];
	} else {
		benchSpecs = ["all"];
	}

	console.log(`Resolving frameworks that match: ${specs.join(", ")}...`);

	/** @type {string[]} */
	// @ts-ignore
	const pkgPaths = (await Promise.all(specs.map(resolveFrameworkSpec))).flat();
	const frameworks = await Promise.all(pkgPaths.map(createFrameworkData));

	console.log("Resolved to:", pkgPaths);
	console.log("Resolving benchmarks to run...");

	/** @type {import('./lib/benches').Bench[]} */
	// @ts-ignore
	const benches = (await Promise.all(benchSpecs.map(resolveBenchSpec))).flat();
	const benchmarks = await getFrameworkBenchFiles(
		frameworks,
		benches,
		options.debug
	);
	const benchIds = Array.from(benchmarks.keys());

	console.log("Resolved to:", benchIds);

	const tachBin = repoRoot("node_modules/tachometer/bin/tach.js");

	for (let benchId of benchIds) {
		console.log(`${benchId}: Running benchmark...`);

		const htmlFiles = benchmarks.get(benchId);
		const args = [
			"--browser",
			"chrome-headless",
			...htmlFiles
			// TODO: add path to tachometer config
		];

		await toCompletion(runNode(tachBin, args, { debug: options.debug }));

		console.log(`${benchId}: Finished running benchmark`);
	}
}
