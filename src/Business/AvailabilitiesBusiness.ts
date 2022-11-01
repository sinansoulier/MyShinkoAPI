// - Imports

// Files
import { AvailabilitiesData } from "../DataAccess/AvailabilitiesData.js";
import { SummarizedAvailabilitiesResponse } from "../Models/SummarizedAvailabilitiesResponse.js";
import { AvailabilitiesResponse } from "../Models/AvailabilitiesResponse.js";
import { DateUtils } from "../Utils/DateUtils.js";

// FIXME: Improve shift slots filtering
class AvailabilitiesBusiness {
    /**
     * Get all summarized availabilities without any filter
     * @returns {Promise<AvailabilitiesResponse[]>} - Promise object represents array of summarized availabilities
     */
    static async getAllSummarizedAvailabilities(): Promise<SummarizedAvailabilitiesResponse[]> {
        // FIXME: Implement function
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

        let promises: Promise<SummarizedAvailabilitiesResponse[]>[] = []
        for (let i = 0; i < numberOfRequests; i++) {
            promises.push(AvailabilitiesData.getSummarizedAvailabilities(beginDates[i], endDates[i]))
        }

        let summarizedAvailabilities = (await Promise.all(promises))
            .flatMap(elt => elt)
            .filter(elt => elt.shifts
                .some(shiftSlot => shiftSlot.possible_guests.length > 0)
            )
        summarizedAvailabilities.forEach(elt => {
            elt.shifts = elt.shifts
                .filter(shift => shift.possible_guests.length > 0)
        })

        return summarizedAvailabilities
    }

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

        let availabilitiesResponse: AvailabilitiesResponse[] = (await Promise.all(promises))
                .flatMap(elt => elt)
                .filter(elt => elt.shifts
                    .flatMap(shift => shift.shift_slots)
                    .some(shiftSlot => shiftSlot.possible_guests.length > 0)
        )

        availabilitiesResponse.forEach(elt => {
            elt.shifts.forEach(shift => {
                shift.shift_slots = shift.shift_slots
                    .filter(shiftSlot => shiftSlot.possible_guests.length > 0)
            })
            elt.shifts = elt.shifts
                .filter(shift => shift.shift_slots.length > 0)
        })

        return availabilitiesResponse
    }

    /**
     * Get summarized availabilities by begin and end date
     * @param beginDate{string} - Begin date
     * @param endDate{string} - End date
     * @returns {Promise<SummarizedAvailabilitiesResponse[]>} - Promise object represents array of summarized availabilities
     */
    static async getSummarizedAvailabilitiesByDates(beginDate: string, endDate: string): Promise<SummarizedAvailabilitiesResponse[]> {
        // FIXME: Handle response errors
        let responses: SummarizedAvailabilitiesResponse[] =  await AvailabilitiesData.getSummarizedAvailabilities(beginDate, endDate)
        responses = responses
            .filter(elt => elt.shifts
                .some(shiftSlot => shiftSlot.possible_guests.length > 0)
            )
        return responses
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
     * Get summarized availabilities with range of number of guests
     * @param numberOfGuests{number[]} - Range of number of guests
     */
    static async getSummarizedAvailabilitiesByNumberOfGuests(numberOfGuests: number[]): Promise<SummarizedAvailabilitiesResponse[]> {
        // FIXME: Handle response errors
        let availabilitiesResponses: SummarizedAvailabilitiesResponse[] = await AvailabilitiesBusiness.getAllSummarizedAvailabilities()
        availabilitiesResponses = availabilitiesResponses
            .filter(elt => elt.shifts
                .some(shiftSlot =>
                    numberOfGuests.every(numberOfGuest => shiftSlot.possible_guests.includes(numberOfGuest))
                )
            )

        return availabilitiesResponses
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
