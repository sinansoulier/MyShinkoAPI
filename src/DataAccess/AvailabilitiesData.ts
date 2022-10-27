// Imports
// Modules
import fetch from 'node-fetch';

// Project imports
import { AppConstants } from '../Utils/AppConstants.js'
import { AvailabilitiesResponse } from "../Models/AvailabilitiesResponse.js";
import {SummarizedAvailabilitiesResponse, SummarizedShift} from "../Models/SummarizedAvailabilitiesResponse.js";

class AvailabilitiesData {
    /**
     * Fetch summarized availabilities by begin and end date under JSON format
     * @param {string} beginDate - Begin date in YYYY-MM-DD format
     * @param {string} endDate - End date in YYYY-MM-DD format
     * @returns {Promise<SummarizedAvailabilitiesResponse>} - Promise object represents the summarized availabilities JSON
     */
    static async getSummarizedAvailabilities(beginDate: string, endDate: string): Promise<SummarizedAvailabilitiesResponse[]> {
        const response = await fetch(AppConstants.Shinko.summarizedAvailabilitiesURL(beginDate, endDate))
        let responseJSON = await response.text()
        let responseObjects: SummarizedAvailabilitiesResponse[] = JSON.parse(responseJSON)
        let availabilities: SummarizedAvailabilitiesResponse[] = []
        for (let responseObject of responseObjects) {
            let availability = {} as SummarizedAvailabilitiesResponse

            availability.date = responseObject.date
            availability.shifts = []
            for (let responseShift of responseObject.shifts) {
                let shift = {} as SummarizedShift
                shift.shiftType = responseShift === responseObject.shifts[0] ? "Midi" : "Soir"
                shift.possible_guests = responseShift.possible_guests
                availability.shifts.push(shift)
            }

            availabilities.push(availability)
        }
        return availabilities
    }

    /**
     * Fetch availabilities by begin and end date under JSON format
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
