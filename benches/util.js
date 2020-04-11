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

export function getById(id) {
	const button = document.getElementById(id);
	if (button == null) {
		throw new Error(`Could not element with id: '${id}'`);
	}

	return button;
}

/**
 * @param {string} selector
 * @returns {Element}
 */
export function getBySelector(selector) {
	const element = document.querySelector(selector);
	if (element == null) {
		throw new Error(`Could not find element matching selector: ${selector}`);
	}

	return element;
}

export function getText(selector) {
	const element = getBySelector(selector);
	return element.textContent;
}

export function getRowIdSel(index) {
	return `tbody > tr:nth-child(${index}) > td:first-child`;
}

export function getRowLinkSel(index) {
	return `tbody > tr:nth-child(${index}) > td:nth-child(2) > a`;
}

export function testElement(selector) {
	const testElement = document.querySelector(selector);
	if (testElement == null) {
		throw new Error(
			`Test failed. Rendering after one paint was not successful. Could find element matching selector: ${selector}`
		);
	}
}

export function testElementText(selector, expectedText) {
	const actualText = getText(selector);
	if (actualText !== expectedText) {
		throw new Error(
			`Element did not have expected text. Expected: '${expectedText}' Actual: '${actualText}'`
		);
	}
}

export function testElementTextContains(selector, expectedText) {
	const elm = getBySelector(selector);
	if (!elm.textContent.includes(expectedText)) {
		throw new Error(
			`Element did not include expected text. Expected to include: '${expectedText}' Actual: '${elm.textContent}'`
		);
	}
}

export function testElementClassContains(selector, expectedClass) {
	/** @type {HTMLElement} */
	const elm = getBySelector(selector);
	if (!elm.classList.contains(expectedClass)) {
		throw new Error(
			`Expected element to contain class "${expectedClass}". className: ${elm.className}`
		);
	}
}
