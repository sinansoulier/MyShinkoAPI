// - Imports
// Modules
import cheerio from 'cheerio'
import puppeteer from 'puppeteer';

// Project functions
import { fetchBookingButtonHref } from "../mainPage/analysis.js";
import { AppConstants } from "../../utils/appConstants.js";
import { DateUtils } from "../../utils/date.js";

// - Functions

async function getNewBrowserPage(browser, bookingPath) {
    const page = await browser.newPage()
    await page.goto(AppConstants.Shinko.buildPath(bookingPath), {waitUntil: 'networkidle0'})
    return page
}

async function extractBookingTimeTables(page) {
    let pageContent = await page.content()
    let $ = cheerio.load(pageContent)

    let hourDates = []
    let hourButtonList = $('div[class="sc-bdfBQB sc-gsTEea lavsoq hHhNXG"]')
    hourButtonList.each((index, element) => {
        hourDates = $(element).text().match(/.{1,5}/g)
    })
    return hourDates
}

async function extractBookingTimeTablesFromButtons(numberDayButtons, browser, bookingPath) {
    let hourDates = []
    let promises = []
    for (let i = 0; i < numberDayButtons; i++) {
        let promise = (async () => {
            let newPage = await getNewBrowserPage(browser, bookingPath)
            let buttons = await newPage.$$('label[class="sc-bdfBQB LabelBox___StyledBox-sc-1jd55lr-0 glyJBl mlirO"]')
            await buttons[i].click()
            let timeTables = await extractBookingTimeTables(newPage)
            hourDates.push([i, timeTables])
        })
        promises.push(promise())
    }
    await Promise.all(promises)
    hourDates.sort((a, b) => a[0] - b[0])
    return hourDates.map(e => e[1])
}

/**
 * Extract booking page availability information (as dates)
 */
async function extractBookingAvailabilities() {
    let bookingPath = await fetchBookingButtonHref()
    if (bookingPath === null) {
        throw 'Could not fetch booking page body'
    }
    const browser = await puppeteer.launch({headless: true});
    let page = await getNewBrowserPage(browser, bookingPath)
    let pageContent = await page.content()

    // Booking availability
    let dayDates = []
    let hourDates = []

    let $ = cheerio.load(pageContent)
    let dayButtonList = $('label[class="sc-bdfBQB LabelBox___StyledBox-sc-1jd55lr-0 glyJBl mlirO"]')
    if (dayButtonList.length > 0) {
        dayButtonList.each((index, element) => {
            dayDates.push($(element).text())
        })

        hourDates = await extractBookingTimeTablesFromButtons(dayButtonList.length, browser, bookingPath)
    } else {
        // FIXME: fetch booking availability details
        console.log("Booking available today!")
    }
    await browser.close()
    let dates = []
    for (let i = 0; i < dayDates.length; i++) {
        let newDates = DateUtils.generateDatesFromTimeTable(dayDates[i], hourDates[i])
        dates.push(newDates)
    }
    return dates.flatMap(elt => elt)
}

export {
    extractBookingAvailabilities,
}