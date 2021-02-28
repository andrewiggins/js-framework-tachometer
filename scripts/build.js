import * as path from "path";
import { readFile, writeFile, mkdir } from "fs/promises";
import cpy from "cpy";
import dot from "dot";
import { repoRoot } from "./lib/paths.js";
import { resolveFrameworkSpec, createFrameworkData } from "./lib/frameworks.js";
import { getAllBenches } from "./lib/benches.js";
import { runNpm, ensureNpmPathSet, toCompletion } from "./lib/node.js";

const SCRIPT_TYPE_REGEX = /{{ SCRIPT_TYPE }}/g;
const FRAMEWORK_URL_REGEX = /{{ FRAMEWORK_INDEX }}/g;
const UTIL_URL = /{{ UTIL_URL }}/g;

/**
 * @param {string[]} specs The frameworks requested by the user on the command line
 * @param {import('./index').CmdLineOptions & { dev: boolean; }} options
 */
export async function build(specs, options) {
	ensureNpmPathSet();
	const buildTask = options.debug || options.dev ? "build:dev" : "build:prod";

	if (!specs || specs.length == 0) {
		specs = ["setup"];
	}

	console.log(`Resolving frameworks that match: ${specs.join(", ")}...`);
	/** @type {string[]} */
	// @ts-ignore
	const pkgPaths = (await Promise.all(specs.map(resolveFrameworkSpec))).flat();
	console.log("Resolved to:", pkgPaths);

	console.log("Compiling index.html...");
	await compileIndex();
	await copyStyles();
	console.log("Finished compiling index.html");

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
			const html = bench.content
				.replace(FRAMEWORK_URL_REGEX, "../" + framework.jsUrl)
				.replace(SCRIPT_TYPE_REGEX, framework.jsType)
				.replace(UTIL_URL, "../../../util.js");

			const outputDir = repoRoot(framework.path, "benches");
			await mkdir(outputDir, { recursive: true });

			const outputPath = path.join(outputDir, bench.fileName);
			await writeFile(outputPath, html, "utf-8");
		});

		await Promise.all(benchTasks);

		console.log(`${name}: Finished building benches (${++i}/${n})`);

		return framework;
	});

	return Promise.all(tasks);
}

/** @type {import('dot').TemplateSettings} */
const templateSettings = {
	...dot.templateSettings,
	varname: "frameworks, benchmarks, builtBy",
	strip: false
};

async function compileIndex() {
	const benches = await getAllBenches();
	const pkgPaths = await resolveFrameworkSpec("setup");
	const frameworks = await Promise.all(pkgPaths.map(createFrameworkData));

	let builtBy = "local";
	if (process.env.GITHUB_ACTIONS == "true") {
		const env = process.env;
		builtBy = `${env.GITHUB_WORKFLOW}#${env.GITHUB_RUN_NUMBER} (${env.GITHUB_RUN_ID})`;
	}

	const templatePath = repoRoot("index.dot.html");
	const rawTemplate = await readFile(templatePath, "utf-8");
	const render = dot.template(rawTemplate, templateSettings);

	const html = render(frameworks, benches, builtBy);
	await writeFile(templatePath.replace(".dot.html", ".html"), html, "utf-8");
}

async function copyStyles() {
	const spectreGlobs = ["node_modules/spectre.css/dist/*"];
	await Promise.all([
		// For local server
		cpy(spectreGlobs, "dist/styles", { cwd: repoRoot() }),
		// For gh-pages
		cpy(spectreGlobs, "dist/dist/styles", { cwd: repoRoot() })
	]);
}
