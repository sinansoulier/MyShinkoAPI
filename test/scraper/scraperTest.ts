import { printBaseURL } from "../../src/scraper/mainPage/fetcher.js";
import { Scraper } from "../../src/scraper/bookingPage/analysis.js";

// Test that base URL can be printed
printBaseURL()

/**
 * Check that scraper does not throw any errors
 */
async function checkScrapingWorker(): Promise<void> {
    try {
        let _ = await Scraper.extractBookingAvailabilities()
    } catch {
        throw "Error: Scraper did not run properly"
    }
}

/**
 * Test launcher
 */
async function launchTests(): Promise<void> {
    await checkScrapingWorker()
    console.log("Scraper: OK")
}

// Tests entry point
await launchTests()
