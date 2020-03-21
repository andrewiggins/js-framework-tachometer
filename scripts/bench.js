const path = require("path");
const {
	resolveFrameworkSpec,
	createFrameworkData
} = require("./lib/frameworks");
const { runNode, toCompletion } = require("./lib/node");

/**
 * @param {string[]} specs The frameworks requested by the user on the command line
 * @param {import('./index').CmdLineOptions} options
 */
async function bench(specs, options) {
	console.log("Resolving specified frameworks...");

	if (!specs || specs.length == 0) {
		specs = ["installed"];
	}

	// @ts-ignore
	const pkgPaths = (await Promise.all(specs.map(resolveFrameworkSpec))).flat();
	const frameworks = await Promise.all(pkgPaths.map(createFrameworkData));

	console.log("Resolved to:", pkgPaths);

	console.log(frameworks);
}

module.exports = {
	bench
};
