// - Imports

// Files
import { AvailabilitiesData } from "../DataAccess/AvailabilitiesData.js";
import { AvailabilitiesResponse } from "../Models/AvailabilitiesResponse.js";
import { DateUtils } from "../Utils/DateUtils.js";
import { SummarizedShift } from "../Models/SummarizedShift/SummarizedShift.js";

class AvailabilitiesBusiness {
    /**
     * Get all summarized availabilities without any filter
     * @returns {Promise<AvailabilitiesResponse[]>} - Promise object represents array of summarized availabilities
     */
    static async getAllSummarizedAvailabilities(): Promise<AvailabilitiesResponse<SummarizedShift>[]> {
        // FIXME: Handle errors
        let beginDate: Date = DateUtils.getCurrentDayDate()
        let endDate: Date = DateUtils.addDaysToDate(beginDate, 40)
        const numberOfRequests: number = 3

        let requests: Promise<AvailabilitiesResponse<SummarizedShift>[]>[] = []

        // Build requests as Promises
        for (let i = 0; i < numberOfRequests; i++) {
            requests.push(
                AvailabilitiesData.getSummarizedAvailabilities(
                    DateUtils.getDateString(beginDate),
                    DateUtils.getDateString(endDate)
                )
            )

            beginDate = endDate
            endDate = DateUtils.addDaysToDate(beginDate, 40)
        }

        // Perform requests
        let summarizedAvailabilities = (await Promise.all(requests))
            .flatMap(elt => elt)
            .filter(elt => elt.shifts
                .some(shiftSlot => shiftSlot.possible_guests.length > 0)
            )

        // Remove availabilities without any possible guest
        summarizedAvailabilities.forEach(elt => {
            elt.shifts = elt.shifts
                .filter(shift => shift.possible_guests.length > 0)
        })

        return summarizedAvailabilities
    }

    /**
     * Get summarized availabilities by begin and end date
     * @param beginDate{string} - Begin date
     * @param endDate{string} - End date
     * @returns {Promise<AvailabilitiesResponse[]>} - Promise object represents array of summarized availabilities
     */
    static async getSummarizedAvailabilitiesByDates(beginDate: string, endDate: string): Promise<AvailabilitiesResponse<SummarizedShift>[]> {
        // FIXME: Handle response errors
        let responses: AvailabilitiesResponse<SummarizedShift>[] =  await AvailabilitiesData.getSummarizedAvailabilities(beginDate, endDate)
        responses = responses
            .filter(elt => elt.shifts
                .some(shiftSlot => shiftSlot.possible_guests.length > 0)
            )
        return responses
    }

    /**
     * Get summarized availabilities with range of number of guests
     * @param numberOfGuests{number[]} - Range of number of guests
     */
    static async getSummarizedAvailabilitiesByNumberOfGuests(numberOfGuests: number[]): Promise<AvailabilitiesResponse<SummarizedShift>[]> {
        // FIXME: Handle response errors
        let availabilitiesResponses: AvailabilitiesResponse<SummarizedShift>[] = await AvailabilitiesBusiness.getAllSummarizedAvailabilities()
        availabilitiesResponses = availabilitiesResponses
            .filter(elt => elt.shifts
                .some(shiftSlot =>
                    numberOfGuests.every(numberOfGuest => shiftSlot.possible_guests.includes(numberOfGuest))
                )
            )

        return availabilitiesResponses
    }

    /**
     * Get all availabilities without any filter
     * @returns {Promise<AvailabilitiesResponse[]>} - Promise object represents array of availabilities
     */
    // static async getAllAvailabilities(): Promise<AvailabilitiesResponse[]> {
//        // FIXME: Implement this method
    // }

    /**
     * Get availabilities by begin and end date
     * @param beginDate{string} - Begin date
     * @param endDate{string} - End date
     * @returns {Promise<AvailabilitiesResponse[]>} - Promise object represents array of availabilities
     */
    // static async getAvailabilitiesByDates(beginDate: string, endDate: string): Promise<AvailabilitiesResponse[]> {
    //     // FIXME: Implement this method
        // return []
    // }




    /**
     * Get availabilities with range of number of guests
     * @param numberOfGuests{number[]} - Range of number of guests
     */
    // static async getAvailabilitiesByNumberOfGuests(numberOfGuests: number[]): Promise<AvailabilitiesResponse[]> {
        // FIXME: Implement this method
        // return []
    // }

    /**
     * Get availabilities by dates, range of number of guests, and by shift type
     * @param beginDate{string} - Begin date
     * @param endDate{string} - End date
     * @param numberOfGuests{number[]} - Number of guests
     * @param shiftType{string} - Shift type
     * @returns {Promise<AvailabilitiesResponse[]>} - Promise object represents array of availabilities
     */
    // static async getAvailabilitiesByShiftType(beginDate: string, endDate: string, numberOfGuests: number[], shiftType: string): Promise<AvailabilitiesResponse[]> {
//        // FIXME: Finish implementation
//         return []
//     }
}

export {
    AvailabilitiesBusiness,
}
