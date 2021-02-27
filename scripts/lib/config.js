import * as path from "path";
import { writeFile, mkdir } from "fs/promises";
import del from "del";
import { repoRoot, toUrl } from "./paths.js";

const measureName = "duration"; // Must match measureName in '../src/util.js'
const TACH_SCHEMA =
	"https://raw.githubusercontent.com/Polymer/tachometer/master/config.schema.json";

export const baseTraceLogDir = (...args) =>
	path.join(repoRoot("logs"), ...args);

/**
 * @param {string} htmlFile
 * @returns {Pick<ConfigFileBenchmark, "name" | "url" | "measurement">}
 */
function getBaseBenchmarkConfig(htmlFile) {
	/** @type {ConfigFileBenchmark["measurement"]} */
	let measurement = [
		{
			name: "duration",
			mode: "performance",
			entryName: measureName
		}
		// {
		// 	name: "usedJSHeapSize",
		// 	mode: "expression",
		// 	expression: "window.usedJSHeapSize"
		// }
	];

	const htmlUrl = toUrl(htmlFile);
	if (!htmlUrl.startsWith("frameworks/")) {
		throw new Error(`Unrecognized benchmark HTML URL path: ${htmlUrl}`);
	}

	const name = htmlUrl
		.replace(/^frameworks\//, "")
		.split("/")
		.slice(0, 2)
		.join("/");

	return {
		name,
		url: htmlUrl,
		measurement
	};
}

/**
 * @typedef {import('tachometer/lib/configfile').ConfigFile} ConfigFile Expected
 * format of a top-level tachometer JSON config file.
 * @typedef {ConfigFile["benchmarks"][0]} ConfigFileBenchmark
 * @typedef {{ name: string; configPath: string; config: ConfigFile; }} ConfigData
 * @param {string} benchId
 * @param {string[]} htmlFiles
 * @param {import("../index.js").CmdLineOptions & import("../bench").BenchOptions} options
 * @returns {Promise<ConfigData>}
 */
export async function generateConfig(benchId, htmlFiles, options) {
	/** @type {ConfigFileBenchmark["expand"]} */
	let expand;
	/** @type {BrowserConfigs} */
	let browser;

	// See https://www.npmjs.com/package/tachometer#browsers
	// and https://www.npmjs.com/package/tachometer#config-file
	if (Array.isArray(options.browser)) {
		expand = options.browser.map(browserOpt => ({
			browser: parseBrowserOption(browserOpt)
		}));
	} else {
		browser = parseBrowserOption(options.browser);
	}

	if (browser.name == "chrome" && options.trace) {
		const traceLogDir = baseTraceLogDir(benchId);
		await del("**/*", { cwd: traceLogDir });
		await mkdir(traceLogDir, { recursive: true });

		browser.trace = {
			logDir: traceLogDir
		};
	}

	/** @type {ConfigFile["benchmarks"]} */
	const benchmarks = [];
	for (let htmlFile of htmlFiles) {
		const baseBenchConfig = getBaseBenchmarkConfig(htmlFile);
		benchmarks.push({
			...baseBenchConfig,
			browser,
			expand
		});
	}

	/** @type {ConfigFile} */
	const config = {
		$schema: TACH_SCHEMA,
		sampleSize: options["sample-size"],
		timeout: options.timeout,
		horizons: options.horizon.split(","),
		benchmarks
	};

	const configPath = await writeConfig(benchId, config);

	return { name: benchId, configPath, config };
}

async function writeConfig(name, config) {
	const configPath = repoRoot("dist/configs", name + ".config.json");
	await mkdir(path.dirname(configPath), { recursive: true });
	await writeFile(configPath, JSON.stringify(config, null, 2), "utf8");

	return configPath;
}

/**
 * @typedef {Exclude<ConfigFileBenchmark["browser"], string>} BrowserConfigs
 * @param {string} str
 * @returns {BrowserConfigs}
 */
function parseBrowserOption(str) {
	// Source: https://github.com/Polymer/tachometer/blob/d4d5116acb2d7df18035ddc36f0a3a1730841a23/src/browser.ts#L100
	let remoteUrl;
	const at = str.indexOf("@");
	if (at !== -1) {
		remoteUrl = str.substring(at + 1);
		str = str.substring(0, at);
	}
	const headless = str.endsWith("-headless");
	if (headless === true) {
		str = str.replace(/-headless$/, "");
	}

	/** @type {import('tachometer/lib/browser').BrowserName} */
	// @ts-ignore
	const name = str;

	/** @type {BrowserConfigs} */
	const config = { name, headless };
	if (remoteUrl !== undefined) {
		config.remoteUrl = remoteUrl;
	}

	// Custom browser options
	if (config.name == "chrome") {
		config.addArguments = [
			"--js-flags=--expose-gc",
			"--enable-precise-memory-info"
		];
	}

	return config;
}
