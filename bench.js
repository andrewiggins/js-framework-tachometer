// Copied from https://github.com/Polymer/tachometer/blob/master/client/src/bench.ts
// Added here so running a local http-server in this directory allows the framework
// benchmark files to properly run

let startTime;
export function start() {
	startTime = performance.now();
}
export async function stop() {
	const end = performance.now();
	const runtime = end - startTime;
	console.log("local benchmark runtime", runtime, "ms");
}
