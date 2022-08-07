import { printBaseURL } from "./src/scraper/mainPage/fetcher.js";
import { extractBookingPageAvailabilities } from "./src/scraper/bookingPage/analysis.js";

// Test function call
printBaseURL()

let availability = await extractBookingPageAvailabilities(true)
console.log(availability)