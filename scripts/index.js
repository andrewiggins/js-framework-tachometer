const { readFileSync } = require("fs");
const sade = require("sade");
const { repoRoot } = require("./lib/paths");
const { setup } = require("./setup");
const { build } = require("./build");
const { bench } = require("./bench");

/**
 * @typedef {{ debug: boolean; }} CmdLineOptions
 */
async function main() {
	const pkg = JSON.parse(readFileSync(repoRoot("package.json"), "utf8"));
	const prog = sade("scripts");

	// Global options
	prog
		.version(pkg.version)
		.option("-D --debug", "Enable more verbose logging for debugging");

	// Setup command
	prog
		.command("setup [frameworks]")
		.describe(
			"Setups the specified frameworks. Specify using folder name (e.g. 'preact', 'keyed/preact'). Use `all` to setup all frameworks."
		)
		.action(setup);

	prog
		.command("build")
		.option(
			"-d --dev",
			"Build the development bundle of the frameworks - possibly useful for debugging."
		)
		.describe(
			"Builds the benches and the (optionally) specified frameworks. Defaults to any framework that is properly setup. Can specify specific frameworks by using folder name (e.g. 'preact', 'keyed/preact'). Use `all` to setup all frameworks."
		)
		.action(build);

	prog
		.command("bench")
		.describe(
			"Run tachometer on the (optionally) specified frameworks. Defaults to any framework that is properly built. Can specify specific frameworks by using folder name (e.g. 'preact', 'keyed/preact'). Use `all` to setup all frameworks."
		)
		.action(bench);

	// @ts-ignore
	const { args, handler } = prog.parse(process.argv, { lazy: true });

	let options;
	let frameworks;
	if (args.length == 1) {
		frameworks = [];
		options = args[0];
	} else if (args.length == 2) {
		options = args[1];

		frameworks = [];
		if (args[0]) {
			frameworks.push(args[0]);
		}

		frameworks.push(...options._);
	} else {
		throw new Error("Unexpected number of arguments from sade!");
	}

	return handler(frameworks, options);
}

main().catch(error => {
	console.error(error);
	process.exit(1);
});
