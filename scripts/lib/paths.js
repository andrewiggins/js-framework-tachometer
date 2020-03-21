const path = require("path");
const globby = require("globby");
const memoize = require("mem");

const repoRoot = (...args) => path.join(__dirname, "..", "..", ...args);
const pathToUri = path => path.replace(/\\/g, "/");

const getAllFrameworkPkgPaths = memoize(() =>
	globby(
		["frameworks/keyed/*/package.json", "frameworks/non-keyed/*/package.json"],
		{
			cwd: repoRoot()
		}
	)
);

const getInstalledFrameworkPkgPaths = memoize(async () => {
	const pgkLockPaths = await globby(
		[
			"frameworks/keyed/*/package-lock.json",
			"frameworks/non-keyed/*/package-lock.json"
		],
		{
			cwd: repoRoot()
		}
	);

	return pgkLockPaths.map(pkgLockPath =>
		pkgLockPath.replace("package-lock.json", "package.json")
	);
});

module.exports = {
	repoRoot,
	// repoRootRel,
	pathToUri,
	getAllFrameworkPkgPaths,
	getInstalledFrameworkPkgPaths
};
