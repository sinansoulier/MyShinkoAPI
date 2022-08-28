// - Imports
// Modules
import cheerio from 'cheerio'
import puppeteer from 'puppeteer';

// Project functions
import { fetchBookingButtonHref } from "../mainPage/analysis.js";
import { DateUtils } from "../../utils/date.js";
import { FunctionUtils } from "../../utils/functions.js";


// Scraper Object

class Scraper {

// - Functions

    /**
     * Generate new browser page
     * @param browser
     * @param bookingPath
     */
    static async getNewBrowserPage(browser: puppeteer.Browser, bookingPath: string): Promise<puppeteer.Page> {
        const page = await browser.newPage()
        await page.goto(FunctionUtils.Scraper.buildPath(bookingPath), {waitUntil: 'networkidle0'})
        return page
    }

    /**
     * Extract current page timetable
     * @param page
     */
    static async extractBookingTimeTables(page: puppeteer.Page): Promise<string[]> {
        let pageContent = await page.content()
        let $ = cheerio.load(pageContent)

        let hourDates = []
        let hourButtonList = $('div[class="sc-bdfBQB sc-gsTEea lavsoq hHhNXG"]')
        hourButtonList.each((index, element) => {
            hourDates = $(element).text().match(/.{1,5}/g)
        })
        return hourDates
    }

    /**
     * Extract all timetables from booking page
     * @param numberDayButtons
     * @param browser
     * @param bookingPath
     */
    static async extractBookingTimeTablesFromButtons(numberDayButtons: number,
                                        browser: puppeteer.Browser,
                                        bookingPath: string): Promise<string[][]> {
        let hourDates = []
        let promises = []
        for (let i = 0; i < numberDayButtons; i++) {
            let promise = (async () => {
                let newPage = await Scraper.getNewBrowserPage(browser, bookingPath)
                let buttons = await newPage.$$('label[class="sc-bdfBQB LabelBox___StyledBox-sc-1jd55lr-0 glyJBl mlirO"]')
                await buttons[i].click()
                let timeTables = await Scraper.extractBookingTimeTables(newPage)
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
     * @returns {Promise<string[]>} - Booking page availability information (as dates)
     */
    static async extractBookingAvailabilities(): Promise<string[]> {
        let bookingPath = await fetchBookingButtonHref()
        if (bookingPath === null) {
            throw 'Could not fetch booking page body'
        }
        const browser = await puppeteer.launch({headless: true});
        let page = await Scraper.getNewBrowserPage(browser, bookingPath)
        let pageContent = await page.content()

        // Booking availability
        let dayDates: string[] = []
        let hourDates: string[][] = []

        let $ = cheerio.load(pageContent)
        let dayButtonList = $('label[class="sc-bdfBQB LabelBox___StyledBox-sc-1jd55lr-0 glyJBl mlirO"]')
        if (dayButtonList.length > 0) {
            dayButtonList.each((index, element) => {
                dayDates.push($(element).text())
            })

            hourDates = await Scraper.extractBookingTimeTablesFromButtons(dayButtonList.length, browser, bookingPath)
        } else {
            let todayHourDates: string[] = await Scraper.extractBookingTimeTables(page)
            hourDates.push(todayHourDates)
        }
        await browser.close()

        return DateUtils.generateDatesFromTimeTable(dayDates, hourDates)
    }

    static async extractDaysBookings(): Promise<string[]> {
        let bookingPath = await fetchBookingButtonHref()
        if (bookingPath === null) {
            throw 'Could not fetch booking page body'
        }
        const browser = await puppeteer.launch({headless: true});
        let page = await Scraper.getNewBrowserPage(browser, bookingPath)
        let pageContent = await page.content()

        // Booking availability
        let dayDates: string[] = []
        let hourDates: string[][] = []

        let $ = cheerio.load(pageContent)
        let dayButtonList = $('label[class="sc-bdfBQB LabelBox___StyledBox-sc-1jd55lr-0 glyJBl mlirO"]')
        if (dayButtonList.length > 0) {
            dayButtonList.each((index, element) => {
                dayDates.push($(element).text())
            })

            // hourDates = await Scraper.extractBookingTimeTablesFromButtons(dayButtonList.length, browser, bookingPath)
        }
        await browser.close()

        return dayDates
    }
}
export {
    Scraper,
}
