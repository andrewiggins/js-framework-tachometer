const path = require("path");
const { readFile } = require("fs").promises;
const memoize = require("mem");
const {
	repoRoot,
	pathToUri,
	getAllFrameworkPkgPaths,
	getSetupFrameworkPkgPaths,
	getBuiltFrameworkPkgPaths
} = require("./paths");

/**
 * @param {string} spec
 * @returns {Promise<string[]>}
 */
async function resolveFrameworkSpec(spec) {
	if (spec === "all") {
		return getAllFrameworkPkgPaths();
	} else if (spec === "setup") {
		return getSetupFrameworkPkgPaths();
	} else if (spec === "built") {
		return getBuiltFrameworkPkgPaths();
	} else {
		const pkgPaths = await getAllFrameworkPkgPaths();
		const matchingPkgPaths = pkgPaths.filter(pkgPath =>
			pkgPath.includes(pathToUri(spec))
		);

		if (matchingPkgPaths.length == 0) {
			throw new Error(`No frameworks matched '${spec}'.`);
		}

		return matchingPkgPaths;
	}
}

/**
 * @typedef {{ id: string; name: string; versions: string[]; path: string; keyedType: "keyed" | "non-keyed"; fullName: string; }} FrameworkData
 * @type {(pkgPath: string) => Promise<FrameworkData>}
 */
const createFrameworkData = memoize(async pkgPath => {
	const pkg = JSON.parse(await readFile(pkgPath, "utf-8"));

	const relativePath = path.dirname(path.relative(repoRoot(), pkgPath));
	const name = path.basename(relativePath);
	const keyedType = relativePath.startsWith(path.join("frameworks", "keyed"))
		? "keyed"
		: "non-keyed";

	if (!("js-framework-tachometer" in pkg)) {
		throw new Error(
			`package.json (${pkgPath}) must contain a \'js-framework-tachometer\' property.`
		);
	}

	const metadata = pkg["js-framework-tachometer"];

	/** @type {string[]} */
	let versions = [];
	if ("frameworkPackages" in metadata) {
		const pkgLock = await readPkgLock(pkgPath);
		const packages = metadata["frameworkPackages"];
		versions = packages.map(package => pkgLock.dependencies[package].version);
	} else if ("frameworkPackage" in metadata) {
		const pkgLock = await readPkgLock(pkgPath);
		const package = metadata["frameworkPackage"];
		versions = [pkgLock.dependencies[package].version];
	} else if ("frameworkVersion" in metadata) {
		versions = [metadata["frameworkVersion"]];
	} else {
		throw new Error(
			`package.json (${pkgPath}) for must contain a 'frameworkPackage(s)' or 'frameworkVersion' in the 'js-framework-tachometer' property.`
		);
	}

	return {
		id: pathToUri(relativePath) + "/",
		name,
		versions,
		path: relativePath,
		keyedType,
		fullName: `${name}-v${versions.join("+")}-${keyedType}`
	};
});

async function readPkgLock(pkgPath) {
	const pkgLockPath = pkgPath.replace("package.json", "package-lock.json");
	return JSON.parse(await readFile(pkgLockPath, "utf-8"));
}

module.exports = {
	resolveFrameworkSpec,
	createFrameworkData
};
