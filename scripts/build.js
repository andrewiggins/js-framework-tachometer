const path = require("path");
const { readFile, writeFile, mkdir } = require("fs").promises;
const dot = require("dot");
const { repoRoot, pathToUri } = require("./lib/paths");
const {
	resolveFrameworkSpec,
	createFrameworkData
} = require("./lib/frameworks");
const { getAllBenches } = require("./lib/benches");
const { runNpm, ensureNpmPathSet, toCompletion } = require("./lib/node");

const SCRIPT_TYPE_REGEX = /{{ SCRIPT_TYPE }}/g;
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

	let i = 0;
	const n = pkgPaths.length * 2; // Build bundle + build benchmark html files per framework
	console.log("Beginning build. Estimated task count:", n);

	const tasks = pkgPaths.map(async pkgPath => {
		const cwd = path.dirname(pkgPath);
		const name = path.basename(cwd);
		const npmOptions = { cwd, debug: options.debug };

		console.log(`${name}: Building bundle...`);
		await toCompletion(runNpm(["run", buildTask], npmOptions));
		console.log(`${name}: Finished bundling (${++i}/${n})`);

		console.log(`${name}: Building benches...`);
		const framework = await createFrameworkData(pkgPath);

		const benchTasks = benches.map(async bench => {
			const scriptUrl = `/${pathToUri(framework.path)}/${framework.jsUrl}`;
			const html = bench.content
				.replace(FRAMEWORK_URL_REGEX, scriptUrl)
				.replace(SCRIPT_TYPE_REGEX, framework.jsType);

			const outputDir = repoRoot(framework.path, "benches");
			await mkdir(outputDir, { recursive: true });

			const outputPath = path.join(outputDir, bench.fileName);
			await writeFile(outputPath, html, "utf-8");
		});

		await Promise.all(benchTasks);

		console.log(`${name}: Finished building benches (${++i}/${n})`);

		return framework;
	});

	const frameworks = await Promise.all(tasks);

	await compileIndex(frameworks.sort(), benches.sort());
}

/** @type {import('dot').TemplateSettings} */
const templateSettings = {
	...dot.templateSettings,
	varname: "frameworks, benchmarks",
	strip: false
};

/**
 * @param {any[]} frameworks
 * @param {import('./lib/benches').Bench[]} benches
 */
async function compileIndex(frameworks, benches) {
	const templatePath = repoRoot("index.dot.html");
	const rawTemplate = await readFile(templatePath, "utf-8");
	const render = dot.template(rawTemplate, templateSettings);

	const html = render(frameworks, benches);
	await writeFile(templatePath.replace(".dot.html", ".html"), html, "utf-8");
}

module.exports = {
	build
};
