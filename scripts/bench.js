import { mkdir } from "fs/promises";
import { repoRoot } from "./lib/paths.js";
import { resolveFrameworkSpec, createFrameworkData } from "./lib/frameworks.js";
import { resolveBenchSpec, getFrameworkBenchFiles } from "./lib/benches.js";
import { runNode, toCompletion } from "./lib/node.js";
import { generateConfig } from "./lib/config.js";

/**
 * @typedef BenchOptions
 * @property {number} n The number of samples per framework to take
 * @property {number} timeout How long (in minutes) to attempt to reach the Tachometer horizon
 * @property {string | string[]} browser The browsers to run the benches in
 * @property {string} horizon
 * @property {boolean} trace
 *
 * @param {string[]} specs The frameworks requested by the user on the command line
 * @param {import('./index').CmdLineOptions & BenchOptions} options
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

	console.log("Resolved to:", Array.from(benchmarks.keys()));
	console.log("Generating Tachometer configs...");

	const configs = await Promise.all(
		Array.from(benchmarks.entries()).map(([benchId, htmlFiles]) =>
			generateConfig(benchId, htmlFiles, options)
		)
	);

	await mkdir(repoRoot("results"), { recursive: true });

	const tachBin = repoRoot("node_modules/tachometer/bin/tach.js");
	for (let config of configs) {
		console.log(`${config.name}: Running benchmark...`);

		const args = [
			"--config",
			config.configPath,
			"--json-file",
			repoRoot("results", config.name + ".json"),
		];
		await toCompletion(runNode(tachBin, args, { debug: options.debug }));

		console.log(`${config.name}: Finished running benchmark`);
	}
}
