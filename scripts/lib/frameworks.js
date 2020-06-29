import * as path from "path";
import { readFile } from "fs/promises";
import globby from "globby";
import memoize from "mem";
import { repoRoot, pathToUri } from "./paths.js";

/** @type {import('globby').GlobbyOptions} */
const globbyOpts = { cwd: repoRoot(), dot: true, gitignore: false };

/**
 * @param {string} spec
 * @returns {Promise<string[]>}
 */
export async function resolveFrameworkSpec(spec) {
	if (spec === "setup") {
		const pgkLockPaths = await globby(
			["frameworks/*/*/package-lock.json"],
			globbyOpts
		);

		return pgkLockPaths.map(pkgLockPath =>
			pkgLockPath.replace("package-lock.json", "package.json")
		);
	} else if (spec === "built") {
		const bundles = await globby(["frameworks/*/*/dist/index.js"], globbyOpts);

		return bundles.map(bundlePath =>
			bundlePath.replace("dist/index.js", "package.json")
		);
	} else {
		let pkgPaths = await globby(["frameworks/*/*/package.json"], globbyOpts);

		if (spec !== "all") {
			pkgPaths = pkgPaths.filter(pkgPath => pkgPath.includes(pathToUri(spec)));

			if (pkgPaths.length == 0) {
				throw new Error(`No frameworks matched '${spec}'.`);
			}
		}

		return pkgPaths;
	}
}

/**
 * @typedef {{ id: string; name: string; versions: string[]; path: string; baseUrl: string; jsUrl: string; jsType: string; keyedType: "keyed" | "non-keyed"; fullName: string; }} FrameworkData
 * @type {(pkgPath: string) => Promise<FrameworkData>}
 */
export const createFrameworkData = memoize(async pkgPath => {
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
		versions = packages.map(pkg => pkgLock.dependencies[pkg].version);
	} else if ("frameworkPackage" in metadata) {
		const pkgLock = await readPkgLock(pkgPath);
		const pkg = metadata["frameworkPackage"];
		versions = [pkgLock.dependencies[pkg].version];
	} else if ("frameworkVersion" in metadata) {
		versions = [metadata["frameworkVersion"]];
	} else {
		throw new Error(
			`package.json (${pkgPath}) for must contain a 'frameworkPackage(s)' or 'frameworkVersion' in the 'js-framework-tachometer' property.`
		);
	}

	let jsUrl, jsType;
	if ("module" in pkg) {
		jsUrl = pkg.module;
		jsType = "module";
	} else if ("main" in pkg) {
		jsUrl = pkg.main;
		jsType = "text/javascript";
	} else {
		throw new Error(
			`Could not find main field (IIFE format) or module field (ESM format) in package.json: ${pkgPath}`
		);
	}

	const baseUrl = pathToUri(relativePath);
	return {
		id: baseUrl + "/",
		name,
		versions,
		path: relativePath,
		baseUrl,
		jsUrl,
		jsType,
		keyedType,
		fullName: `${name}-v${versions.join("+")}-${keyedType}`
	};
});

async function readPkgLock(pkgPath) {
	const pkgLockPath = pkgPath.replace("package.json", "package-lock.json");
	return JSON.parse(await readFile(pkgLockPath, "utf-8"));
}
