import { printBaseURL } from "./src/scraper/mainPage/fetcher.js";
import { extractBookingAvailabilities } from "./src/scraper/bookingPage/analysis.js";

// Test function call
printBaseURL()

let dates = await extractBookingAvailabilities()
console.log(dates)