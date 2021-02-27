var e=[],n=new MessageChannel;function o(){n.port2.postMessage(void 0);}n.port1.onmessage=function(){var n=e;e=[];for(var o=performance.now(),a=0;a<n.length;a++)n[a](o);};function afterFrame(n){1===e.push(n)&&requestAnimationFrame(o);}

const measureName = "duration";

/**
 * @extends {Console}
 */
class ConsoleBuffer {
	constructor() {
		/** @type {Array<[string, any[]]>} */
		this.buffer = [];

		for (let methodName of Object.keys(console)) {
			this[methodName] = this.proxy(methodName);
		}
	}

	proxy(methodName) {
		return (...args) => {
			this.buffer.push([methodName, args]);
		};
	}

	flush() {
		let method;
		while ((method = this.buffer.shift())) {
			let [name, args] = method;
			console[name](...args);
		}
	}
}

/** @type {ConsoleBuffer} */
let consoleBuffer;
if (window.location.search.includes("logdom=1")) {
	consoleBuffer = new ConsoleBuffer();
	logCall(Element.prototype, "after");
	logCall(Element.prototype, "append");
	logCall(Element.prototype, "before");
	// logCall(Element.prototype, "innerHTML");
	logCall(Element.prototype, "insertAdjacentElement");
	logCall(Element.prototype, "insertAdjacentHTML");
	logCall(Element.prototype, "insertAdjacentText");
	// logCall(Element.prototype, "outerHTML");
	logCall(Element.prototype, "prepend");
	logCall(Element.prototype, "replaceWith");
	// logCall(Element.prototype, "textContent");

	logCall(Element.prototype, "appendChild");
	logCall(Element.prototype, "insertBefore");
	logCall(Element.prototype, "replaceChild");
	logCall(Element.prototype, "removeChild");
	logCall(Element.prototype, "remove");
}

let scheduled = false;
function scheduleFlush() {
	if (!scheduled && consoleBuffer) {
		afterFrame(() => {
			console.group("Flush");
			consoleBuffer.flush();
			console.groupEnd();
			scheduled = false;
		});
		scheduled = true;
	}
}

/**
 * Serialize an object
 * @param {Object} obj
 * @return {string}
 */
function serialize(obj) {
	let s;
	if (obj instanceof Text) {
		s = "#text";
	} else if (obj instanceof Element) {
		s = `<${obj.localName}>${obj.textContent}`;
	} else if (obj === document) {
		s = "document";
	} else if (typeof obj == "string") {
		s = obj;
	} else {
		s = Object.prototype.toString.call(obj).replace(/(^\[object |\]$)/g, "");
	}

	return s.substr(0, 50);
}

/**
 * Modify obj's original method to log calls and arguments on logger object
 * @template T
 * @param {T} obj
 * @param {keyof T} method
 */
function logCall(obj, method) {
	let old = obj[method];
	obj[method] = function(...args) {
		let c = "";
		for (let i = 0; i < args.length; i++) {
			if (c) c += ", ";
			c += serialize(args[i]);
		}

		// Normalize removeChild -> remove to keep output clean and readable
		const operation =
			method != "removeChild"
				? `${serialize(this)}.${method}(${c})`
				: `${serialize(c)}.remove()`;

		if (consoleBuffer) {
			consoleBuffer.log(operation);
			scheduleFlush();
		}

		return old.apply(this, args);
	};
}

let promise = null;
function afterFrameAsync() {
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

function measureMemory() {
	if ("gc" in window && "memory" in performance) {
		// Report results in MBs
		window.gc();
		window.usedJSHeapSize = performance.memory.usedJSHeapSize / 1e6;
	} else {
		window.usedJSHeapSize = 0;
	}
}

function getById(id) {
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
function getBySelector(selector) {
	const element = document.querySelector(selector);
	if (element == null) {
		throw new Error(`Could not find element matching selector: ${selector}`);
	}

	return element;
}

function getText(selector) {
	const element = getBySelector(selector);
	return element.textContent;
}

function getRowIdSel(index) {
	return `tbody > tr:nth-child(${index}) > td:first-child`;
}

function getRowLinkSel(index) {
	return `tbody > tr:nth-child(${index}) > td:nth-child(2) > a`;
}

function testElement(selector) {
	const testElement = document.querySelector(selector);
	if (testElement == null) {
		throw new Error(
			`Test failed. Rendering after one paint was not successful. Could find element matching selector: ${selector}`
		);
	}
}

function testElementText(selector, expectedText) {
	const actualText = getText(selector);
	if (actualText !== expectedText) {
		throw new Error(
			`Element did not have expected text. Expected: '${expectedText}' Actual: '${actualText}'`
		);
	}
}

function testElementTextContains(selector, expectedText) {
	const elm = getBySelector(selector);
	if (!elm.textContent.includes(expectedText)) {
		throw new Error(
			`Element did not include expected text. Expected to include: '${expectedText}' Actual: '${elm.textContent}'`
		);
	}
}

function testElementClassContains(selector, expectedClass) {
	/** @type {HTMLElement} */
	const elm = getBySelector(selector);
	if (!elm.classList.contains(expectedClass)) {
		throw new Error(
			`Expected element to contain class "${expectedClass}". className: ${elm.className}`
		);
	}
}

export { afterFrame, afterFrameAsync, getById, getBySelector, getRowIdSel, getRowLinkSel, getText, logCall, measureMemory, measureName, testElement, testElementClassContains, testElementText, testElementTextContains };
