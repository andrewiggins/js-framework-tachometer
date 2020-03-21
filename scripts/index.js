const { readFileSync } = require("fs");
const sade = require("sade");
const { repoRoot } = require("./lib/paths");
const { setup } = require("./setup");

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
			"Setups the given frameworks. Specify using folder name (e.g. 'preact', 'keyed/preact'). Use `all` to setup all frameworks."
		)
		.action(setup);

	const {
		// @ts-ignore
		args: [arg1, opts],
		// @ts-ignore
		handler
	} = prog.parse(process.argv, { lazy: true });

	if (!arg1) {
		throw new Error(
			"Expected argument 'frameworks' to be non-null. Run `node ./scripts --help` for guidance."
		);
	}

	if (arg1) {
		opts._.unshift(arg1);
	}

	return handler(opts._, opts);
}

main().catch(error => {
	console.error(error);
	process.exit(1);
});
