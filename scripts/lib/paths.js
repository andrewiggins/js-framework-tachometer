const path = require("path");

const repoRoot = (...args) => path.join(__dirname, "..", "..", ...args);
const pathToUri = path => path.replace(/\\/g, "/");

module.exports = {
	repoRoot,
	pathToUri
};
