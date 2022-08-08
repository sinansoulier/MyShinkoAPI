import { extractBookingPageAvailabilities } from "../../src/scraper/bookingPage/analysis.js";

/**
 * Check that every call to scraper is the same on a number of iterations
 * @param {number} numberOfIterations - Number of times the scraper is called
 */
async function checkScrapingDeterminism(numberOfIterations) {
    let results = (await Promise.all(
        Array(numberOfIterations).fill(numberOfIterations).map(extractBookingPageAvailabilities)
    )).flatMap(res => res)
    if (!results.length) {
        return true
    }
    console.log(results)
    return results.every(elt => {
        return elt === results[0]
    })
}

let result = await checkScrapingDeterminism(2)
if (!result) {
    throw 'Error: Scraper not deterministic'
}

console.log("Scraper: determinism OK")