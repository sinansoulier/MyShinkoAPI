import { AvailabilitiesData } from "../DataAccess/AvailabilitiesData.js";
import { AvailabilitiesResponse } from "../Models/AvailabilitiesResponse.js";
import { DateUtils } from "../Utils/DateUtils.js";

class AvailabilitiesBusiness {
    /**
     * Get all availabilities without any filter
     * @returns {Promise<AvailabilitiesResponse[]>} - Promise object represents array of availabilities
     */
    static async getAllAvailabilities(): Promise<AvailabilitiesResponse[]> {
        // FIXME: Handle response errors
        let beginDate: Date = DateUtils.getCurrentDayDate()
        let endDate: Date = DateUtils.addDaysToDate(beginDate, 40)

        let beginDates: string[] = []
        let endDates: string[] = []
        const numberOfRequests: number = 3

        for (let i = 0; i < numberOfRequests; i++) {
            beginDates.push(DateUtils.getDateString(beginDate))
            endDates.push(DateUtils.getDateString(endDate))
            beginDate = endDate
            endDate = DateUtils.addDaysToDate(beginDate, 40)
        }

        let promises: Promise<AvailabilitiesResponse[]>[] = []
        for (let i = 0; i < numberOfRequests; i++) {
            promises.push(AvailabilitiesData.getAvailabilities(beginDates[i], endDates[i]))
        }

        return (await Promise.all(promises))
                .flatMap(elt => elt)
                .filter(elt => elt.shifts
                    .flatMap(shift => shift.shift_slots)
                    .some(shiftSlot => shiftSlot.possible_guests.length > 0)
        )
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
