import * as path from "path";
import { fileURLToPath } from "url";

// @ts-ignore
const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const repoRoot = (...args) => path.join(__dirname, "..", "..", ...args);
export const pathToUri = path => path.replace(/\\/g, "/");
