// - Imports
// Modules
import fetch from 'node-fetch';

// Project imports
import {AppConstants} from '../../utils/appConstants.js'

// - Functions

/**
 * Fetch main page body
 * @returns {Promise<string>} - Page body as a string of characters
 */
async function fetchBody(): Promise<string> {
    const response = await fetch(AppConstants.Shinko.baseURL)
    return await response.text()
}

export {
    fetchBody,
}
