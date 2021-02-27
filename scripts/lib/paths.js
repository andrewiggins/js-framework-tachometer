import * as path from "path";
import { fileURLToPath } from "url";

// @ts-ignore
const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const repoRoot = (...args) => path.join(__dirname, "..", "..", ...args);
/** @type {(str: string) => string} */
export const toUrl = str => str.replace(/^[A-Za-z]+:/, "/").replace(/\\/g, "/");
