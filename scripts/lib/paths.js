const path = require("path");
const globby = require("globby");
const memoize = require("mem");
const normalizePath = require("normalize-path");

const repoRoot = (...args) => path.join(__dirname, "..", "..", ...args);
const pathToUri = path => path.replace(/\\/g, "/");

const getAllFrameworkPkgPaths = memoize(() =>
	globby(["frameworks/*/*/package.json"], {
		cwd: repoRoot()
	})
);

const getSetupFrameworkPkgPaths = memoize(async () => {
	const pgkLockPaths = await globby(["frameworks/*/*/package-lock.json"], {
		cwd: repoRoot()
	});

	return pgkLockPaths.map(pkgLockPath =>
		pkgLockPath.replace("package-lock.json", "package.json")
	);
});

const getBuiltFrameworkPkgPaths = memoize(async () => {
	const bundlePaths = await globby(["frameworks/*/*/dist/index.js"], {
		cwd: repoRoot()
	});

	return bundlePaths.map(bundlePath =>
		bundlePath.replace("dist/index.js", "package.json")
	);
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
	repoRoot,
	pathToUri,
	getAllFrameworkPkgPaths,
	getSetupFrameworkPkgPaths,
	getBuiltFrameworkPkgPaths,
	getFrameworkBenchFiles
};
