import { extractBookingAvailabilities } from "../../src/scraper/bookingPage/analysis.js";

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