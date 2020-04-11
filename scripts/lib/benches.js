const path = require("path");
const { readFile, readdir } = require("fs").promises;
const memoize = require("mem");
const globby = require("globby");
const normalizePath = require("normalize-path");
const { repoRoot } = require("./paths");

const TITLE_REGEX = /<title>(.+)<\/title>/;
const DESC_REGEX = /<meta\s+name="description"\s+content="(.+)"\s+\/>/;

async function resolveBenchSpec(spec) {
	if (spec == null || spec == "all") {
		return getAllBenches();
	} else {
		const benchmarks = await getAllBenches();
		const matches = benchmarks.filter(b => b.id.includes(spec));
		return matches;
	}
}

/**
 * @typedef {{ id: string; fileName: string; title: string; description: string; content: string; }} Bench
 * @returns {Promise<Bench[]>}
 */
const getAllBenches = memoize(async function getAllBenches() {
	const benchFiles = await globby("benches/*.html", { cwd: repoRoot() });

	const benches = benchFiles.map(async localPath => {
		const fullPath = repoRoot(localPath);
		const fileName = path.basename(fullPath);
		const content = await readFile(fullPath, "utf-8");

		const titleMatch = content.match(TITLE_REGEX);
		const descMatch = content.match(DESC_REGEX);

		if (titleMatch == null) {
			throw new Error(`Bench ${fileName} does not contain a title tag.`);
		}

		if (descMatch == null) {
			throw new Error(
				`Bench ${fileName} does not contain a description meta tag.`
			);
		}

		return {
			id: fileName.replace(".html", ""),
			fileName,
			title: titleMatch[1],
			description: descMatch[1],
			content
		};
	});

	return Promise.all(benches);
});

/**
 * @param {import('./frameworks').FrameworkData[]} [frameworks]
 * @param {import('./benches').Bench[]} [requestedBenches]
 * @param {boolean} [debug]
 */
async function getFrameworkBenchFiles(
	frameworks,
	requestedBenches,
	debug = false
) {
	let benchGlob;
	if (Array.isArray(requestedBenches)) {
		if (requestedBenches.length == 1) {
			benchGlob = `/benches/${requestedBenches[0].id}.html`;
		} else {
			const fileNames = requestedBenches.map(b => b.id).join(",");
			benchGlob = `/benches/{${fileNames}}.html`;
		}
	} else {
		benchGlob = "/benches/*.html";
	}

	let globs;
	if (frameworks == null) {
		globs = ["frameworks/*/*/benches/*.html"];
	} else {
		globs = frameworks.map(f => normalizePath(path.join(f.path, benchGlob)));
	}

	if (debug) {
		console.log("Bench globs:", globs);
	}

	const benchFiles = await globby(globs, {
		cwd: repoRoot()
	});

	/** @type Map<string, string[]> */
	const benches = new Map();
	for (const benchFile of benchFiles) {
		const benchId = path.basename(benchFile).replace(".html", "");

		if (!benches.has(benchId)) {
			benches.set(benchId, []);
		}

		benches.get(benchId).push(benchFile);
	}

	return benches;
}

module.exports = {
	getAllBenches,
	resolveBenchSpec,
	getFrameworkBenchFiles
};
