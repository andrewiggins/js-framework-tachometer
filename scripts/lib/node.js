import { spawn } from "child_process";
import { repoRoot } from "./paths.js";

/**
 * @typedef {{ debug?: boolean; cwd?: string; stdio?: import('child_process').StdioOptions; }} NodeOptions
 * @param {string} path
 * @param {string[]} args
 * @param {NodeOptions} [options]
 */
export function runNode(path, args, options = {}) {
	args.unshift(path);
	if (options.debug) {
		console.log("$", process.execPath, args.join(" "));
	}
	return spawn(process.execPath, args, {
		stdio: options.stdio || "inherit",
		cwd: options.cwd || repoRoot(),
	});
}

export function ensureNpmPathSet() {
	if (!process.env.npm_execpath) {
		throw new Error(
			"Please execute this task using 'npm run setup' or manually set the 'npm_execpath' environment variable"
		);
	}
}

/**
 * @param {string[]} args
 * @param {NodeOptions} [options]
 */
export function runNpm(args, options = {}) {
	ensureNpmPathSet();
	options.stdio = "ignore";
	return runNode(process.env.npm_execpath, args, options);
}

/**
 * @param {import('child_process').ChildProcess} childProcess
 * @returns {Promise<void>}
 */
export function toCompletion(childProcess) {
	return new Promise((resolve, reject) => {
		childProcess.on("error", reject);
		childProcess.on("exit", (code, signal) => {
			if (code > 0) {
				const error = new Error(
					`Child process exited with non-success code: ${code}`
				);
				// @ts-ignore - custom error extension
				error.signal = signal;

				reject(error);
			} else {
				resolve();
			}
		});
	});
}
