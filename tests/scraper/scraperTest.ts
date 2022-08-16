import { printBaseURL } from "../../src/scraper/mainPage/fetcher.js";
import { extractBookingAvailabilities } from "../../src/scraper/bookingPage/analysis.js";

// Test that base URL can be printed
printBaseURL()

/**
 * Check that scraper works as intended
 */
async function checkScrapingWorker() {
    try {
        let results = await extractBookingAvailabilities()
        console.log(results)
    } catch {
        throw "Error: Scraper did not run properly"
    }
    return true
}

/**
 * Test launcher
 */
async function launchTests() {
    await checkScrapingWorker()
    console.log("Scraper: OK")
}

// Tests entry point
await launchTests()
