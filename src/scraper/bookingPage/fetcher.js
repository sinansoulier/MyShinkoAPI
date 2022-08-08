// - Imports
// Modules
import puppeteer from 'puppeteer';

// Project functions
import { fetchBookingButtonHref } from "../mainPage/analysis.js";
import { AppConstants } from "../../utils/appConstants.js";

/**
 * Fetch booking page body
 */

async function fetchBookingPage() {
    let bookingPath = await fetchBookingButtonHref()
    if (bookingPath === null) {
        return null
    }
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    await page.goto(AppConstants.Shinko.buildPath(bookingPath), {waitUntil: 'networkidle0'})
    return { browser, page, bookingPath}
}

export {
    fetchBookingPage,
}