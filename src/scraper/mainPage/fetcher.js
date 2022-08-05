// - Imports
// Modules
import fetch from 'node-fetch';

// Project imports
import { AppConstants } from '../../utils/appConstants.js'

// - Functions

// Test function
function printBaseURL() {
    console.log(`Shinko base URL: ${AppConstants.Shinko.baseURL}`)
}

// Main functions

/**
 * Fetch main page body
 */
async function fetchBody() {
    const response = await fetch(AppConstants.Shinko.baseURL)
    return await response.text()
}

export {
    printBaseURL,
    fetchBody,
}