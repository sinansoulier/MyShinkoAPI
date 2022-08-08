import { extractBookingAvailabilities } from "../../src/scraper/bookingPage/analysis.js";

/**
 * Check that every call to scraper is the same on a number of iterations
 * @param {number} numberOfIterations - Number of times the scraper is called
 */
async function checkScrapingDeterminism(numberOfIterations) {
    let results = (await Promise.all(
        Array(numberOfIterations).fill(numberOfIterations).map(extractBookingAvailabilities)
    ))
    if (!results.length) {
        return true
    }
    let checker = true
    for (let i = 0; (i < numberOfIterations - 1) && checker; i++) {
        for (let j = 0; j < results[0].length && checker; j++)
            checker = results[i][j] === results[i + 1][j]
    }
    return checker
}

let result = await checkScrapingDeterminism(3)
if (!result) {
    throw 'Error: Scraper not deterministic'
}

console.log("Scraper: determinism OK")