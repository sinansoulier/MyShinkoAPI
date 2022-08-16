// - Imports
// Modules
import fetch from 'node-fetch';

// Project imports
import {AppConstants} from '../../utils/appConstants.js'

// - Functions

// Test function
function printBaseURL(): void {
    console.log(`Shinko base URL: ${AppConstants.Shinko.baseURL}`)
}

// Main functions

/**
 * Fetch main page body
 * @returns {Promise<string>} - Page body as a string of characters
 */
async function fetchBody(): Promise<string> {
    const response = await fetch(AppConstants.Shinko.baseURL)
    return await response.text()
}

export {
    printBaseURL,
    fetchBody,
}
