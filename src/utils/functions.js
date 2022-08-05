// - Imports

// JSDOM
import jsdom from 'jsdom';
const { JSDOM } = jsdom;

/**
 * Generate JSDOM document
 * @param {string} body - Page body as a string of characters
 */
function generateDocument(body) {
    const dom = new JSDOM(body)
    return dom.window.document
}

export {
    generateDocument,
}