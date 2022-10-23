// Imports
// Modules
import fetch from 'node-fetch';

// Project imports
import { AppConstants } from '../Utils/AppConstants.js'
import { AvailabilitiesResponse } from "../Models/AvailabilitiesResponse.js";

class AvailabilitiesData {
    /**
     * Fetch availabilities by begin and en date under JSON format
     * @param {string} beginDate - Begin date in YYYY-MM-DD format
     * @param {string} endDate - End date in YYYY-MM-DD format
     * @returns {Promise<string>} - Promise object represents the availabilities JSON
     */
    static async getAvailabilities(beginDate: string, endDate: string): Promise<AvailabilitiesResponse[]> {
        const response = await fetch(AppConstants.Shinko.availabilitiesURL(beginDate, endDate))
        let responseJSON = await response.text()
        return JSON.parse(responseJSON)
    }
}

export {
    AvailabilitiesData,
}
