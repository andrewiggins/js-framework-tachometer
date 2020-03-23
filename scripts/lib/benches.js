const path = require("path");
const { readFile, readdir } = require("fs").promises;
const memoize = require("mem");
const { repoRoot, pathToUri } = require("./paths");

const TITLE_REGEX = /<title>(.+)<\/title>/;
const DESC_REGEX = /<meta name="description" content="(.+)" \/>/;
const FRAMEWORK_URL_REGEX = /{{ FRAMEWORK_INDEX }}/g;

/**
 * @typedef {{ id: string; fileName: string; title: string; description: string; content: string; }} Bench
 * @returns {Promise<Bench[]>}
 */
const getBenches = memoize(async function getBenches() {
	const benchRoot = repoRoot("./benches");
	const benchFiles = await readdir(benchRoot, {
		withFileTypes: true
	});

	const benches = benchFiles
		.filter(entry => entry.isFile())
		.map(async file => {
			const fileName = file.name;
			const fullPath = path.join(benchRoot, file.name);
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
 * @param {Bench} bench
 * @param {import('./frameworks').FrameworkData} framework
 */
function buildFrameworkBench(bench, framework) {
	const scriptUrl = `/${pathToUri(framework.path)}/dist/index.min.js`;
	return bench.content.replace(FRAMEWORK_URL_REGEX, scriptUrl);
}

module.exports = {
	getBenches,
	buildFrameworkBench
};
