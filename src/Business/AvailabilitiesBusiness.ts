import { AvailabilitiesData } from "../DataAccess/AvailabilitiesData.js";
import { AvailabilitiesResponse } from "../Models/AvailabilitiesResponse.js";
import { DateUtils } from "../utils/date.js";

class AvailabilitiesBusiness {
    /**
     * Get all availabilities without any filter
     * @returns {Promise<AvailabilitiesResponse[]>} - Promise object represents array of availabilities
     */
    static async getAllAvailabilities(): Promise<AvailabilitiesResponse[]> {
        // FIXME: Handle response errors
        let allAvailabilitiesResponses: AvailabilitiesResponse[] = []
        let beginDate: Date = DateUtils.getCurrentDayDate()
        let endDate: Date = DateUtils.addDaysToDate(beginDate, 40)
        for (let i = 0; i < 3; i++) {
            let beginDateStr: string = DateUtils.getDateString(beginDate)
            let endDateStr: string = DateUtils.getDateString(endDate)

            let availabilitiesResponse: AvailabilitiesResponse[] = await AvailabilitiesData.getAvailabilities(beginDateStr, endDateStr)
            availabilitiesResponse = availabilitiesResponse.filter(elt => elt.shifts
                .flatMap(shift => shift.shift_slots)
                .some(shiftSlot => shiftSlot.possible_guests.length > 0)
            )
            allAvailabilitiesResponses = allAvailabilitiesResponses.concat(availabilitiesResponse)
            beginDate = endDate
            endDate = DateUtils.addDaysToDate(beginDate, 40)
        }
        return allAvailabilitiesResponses
    }

    /**
     * Get availabilities by begin and end date
     * @param beginDate{string} - Begin date
     * @param endDate{string} - End date
     * @returns {Promise<AvailabilitiesResponse[]>} - Promise object represents array of availabilities
     */
    static async getAvailabilitiesByDates(beginDate: string, endDate: string): Promise<AvailabilitiesResponse[]> {
        // FIXME: Handle response errors
        let responses: AvailabilitiesResponse[] =  await AvailabilitiesData.getAvailabilities(beginDate, endDate)
        responses = responses
            .filter(elt => elt.shifts
                .flatMap(shift => shift.shift_slots)
                .some(shiftSlot => shiftSlot.possible_guests.length > 0)
            )
        return responses
    }

    /**
     * Get availabilities with range of number of guests
     * @param numberOfGuests{number[]} - Range of number of guests
     */
    static async getAvailabilitiesByNumberOfGuests(numberOfGuests: number[]): Promise<AvailabilitiesResponse[]> {
        // FIXME: Handle response errors
        let availabilitiesResponses: AvailabilitiesResponse[] = await AvailabilitiesBusiness.getAllAvailabilities()
        availabilitiesResponses = availabilitiesResponses
            .filter(elt => elt.shifts
                .flatMap(shift => shift.shift_slots)
                .some(shiftSlot =>
                    numberOfGuests.every(numberOfGuest => shiftSlot.possible_guests.includes(numberOfGuest))
                )
            )

        return availabilitiesResponses
    }

    /**
     * Get availabilities by dates, range of number of guests, and by shift type
     * @param beginDate{string} - Begin date
     * @param endDate{string} - End date
     * @param numberOfGuests{number[]} - Number of guests
     * @param shiftType{string} - Shift type
     * @returns {Promise<AvailabilitiesResponse[]>} - Promise object represents array of availabilities
     */
    static async getAvailabilitiesByShiftType(beginDate: string, endDate: string, numberOfGuests: number[], shiftType: string): Promise<AvailabilitiesResponse[]> {
        // FIXME: Finish implementation
        return []
    }
}

export {
    AvailabilitiesBusiness,
}
