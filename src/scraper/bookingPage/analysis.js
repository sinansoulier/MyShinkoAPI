// - Imports
// Modules
import cheerio from 'cheerio'

// Project functions
import { fetchBookingPageBody } from "./fetcher.js";

// - Functions

/**
 * Extract booking page availability information (as dates)
 */
async function extractBookingPageAvailabilities() {
    let responseText = await fetchBookingPageBody()
    if (responseText === null) {
        return null
    }
    let $ = cheerio.load(responseText)
    let dates = []
    let buttonList = $('label[class="sc-bdfBQB LabelBox___StyledBox-sc-1jd55lr-0 glyJBl mlirO"]')
    buttonList.each((index, element) => {
        let button = $(element)
        let availability = button.text()
        dates.push(availability)
    })

    return dates
}

export {
    extractBookingPageAvailabilities,
}