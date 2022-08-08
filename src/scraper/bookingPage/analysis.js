// - Imports
// Modules
import cheerio from 'cheerio'

// Project functions
import { fetchBookingPage } from "./fetcher.js";
import {AppConstants} from "../../utils/appConstants.js";

// - Functions

/**
 * Extract booking page availability information (as dates)
 */

async function extractBookingAvailabilities() {
    let response = await fetchBookingPage()
    if (response === null) {
        throw 'Could not fetch booking page body'
    }

    let responseText = await response.page.content()
    // Booking availability
    let dates = []
    let $ = cheerio.load(responseText)
    let dayButtonList = $('label[class="sc-bdfBQB LabelBox___StyledBox-sc-1jd55lr-0 glyJBl mlirO"]')
    if (dayButtonList.length > 0) {
        dayButtonList.each((index, element) => {
            dates.push($(element).text())
        })
        let hourDates = []
        for (let i = 0; i < dayButtonList.length; i++) {
            let tempPage = await response.browser.newPage()
            await tempPage.goto(AppConstants.Shinko.buildPath(response.bookingPath), {waitUntil: 'networkidle0'})
            let buttons = await tempPage.$$('label[class="sc-bdfBQB LabelBox___StyledBox-sc-1jd55lr-0 glyJBl mlirO"]')
            await buttons[i].click()
            let pageContent = await tempPage.content()
            $ = cheerio.load(pageContent)

            let hourButtonList = $('div[class="sc-bdfBQB sc-gsTEea lavsoq hHhNXG"]')
            hourButtonList.each((index, element) => {
                hourDates.push($(element).text().match(/.{1,5}/g))
            })
            // FIXME

        }
        console.log(hourDates)
    } else {
        // FIXME: fetch booking availability details
        console.log("Booking available today!")
    }
    await response.browser.close()
    return dates
}

export {
    extractBookingAvailabilities,
}