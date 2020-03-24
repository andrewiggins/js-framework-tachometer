const path = require("path");
const { writeFile, mkdir } = require("fs").promises;
const { repoRoot, pathToUri } = require("./lib/paths");
const {
	resolveFrameworkSpec,
	createFrameworkData
} = require("./lib/frameworks");
const { getAllBenches } = require("./lib/benches");
const { runNpm, ensureNpmPathSet, toCompletion } = require("./lib/node");

const INDEX_URL = "dist/index.js";
const FRAMEWORK_URL_REGEX = /{{ FRAMEWORK_INDEX }}/g;

/**
 * @param {string[]} specs The frameworks requested by the user on the command line
 * @param {import('./index').CmdLineOptions} options
 */
async function build(specs, options) {
	ensureNpmPathSet();
	const buildTask = options.debug ? "build:dev" : "build:prod";

	if (!specs || specs.length == 0) {
		specs = ["setup"];
	}

	console.log("Resolving specified frameworks...");
	/** @type {string[]} */
	// @ts-ignore
	const pkgPaths = (await Promise.all(specs.map(resolveFrameworkSpec))).flat();
	console.log("Resolved to:", pkgPaths);

	const benches = await getAllBenches();

	const tasks = pkgPaths.map(async pkgPath => {
		const cwd = path.dirname(pkgPath);
		const name = path.basename(cwd);
		const npmOptions = { cwd, debug: options.debug };

		console.log(`${name}: Building bundle... (0/2)`);
		await toCompletion(runNpm(["run", buildTask], npmOptions));
		console.log(`${name}: Finished bundling (1/2)`);

		console.log(`${name}: Building benches... (1/2)`);
		const framework = await createFrameworkData(pkgPath);

		const benchTasks = benches.map(async bench => {
			const scriptUrl = `/${pathToUri(framework.path)}/${INDEX_URL}`;
			const html = bench.content.replace(FRAMEWORK_URL_REGEX, scriptUrl);

			const outputDir = repoRoot(framework.path, "benches");
			await mkdir(outputDir, { recursive: true });

			const outputPath = path.join(outputDir, bench.fileName);
			await writeFile(outputPath, html, "utf-8");
		});

		await Promise.all(benchTasks);

		console.log(`${name}: Finished building benches (2/2)`);
	});

	await Promise.all(tasks);
}

module.exports = {
	build
};
