import afterFrame from "../node_modules/afterframe/dist/afterframe.module.js";

export { afterFrame };

let promise = null;
export function afterFrameAsync() {
	if (promise === null) {
		promise = new Promise(resolve =>
			afterFrame(time => {
				promise = null;
				resolve(time);
			})
		);
	}

	return promise;
}

export function getButton(buttonId) {
	const button = document.getElementById(buttonId);
	if (button == null) {
		throw new Error("Could not find test run button");
	}

	return button;
}

export function testElement(selector) {
	const testElement = document.querySelector(selector);
	if (testElement == null) {
		throw new Error(
			"Test failed. Rendering after one paint was not successful"
		);
	}
}

export function testElementText(selector, expectedText) {
	const elm = document.querySelector(selector);
	if (elm == null) {
		throw new Error("Could not find element matching selector: " + selector);
	}

	if (elm.textContent != expectedText) {
		throw new Error(
			`Element did not have expected text. Expected: '${expectedText}' Actual: '${elm.textContent}'`
		);
	}
}
