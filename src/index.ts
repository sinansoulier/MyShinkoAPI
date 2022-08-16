import { printBaseURL } from "./scraper/mainPage/fetcher.js";
import { extractBookingAvailabilities } from "./scraper/bookingPage/analysis.js";

// Test function call
printBaseURL()

let dates: string[] = await extractBookingAvailabilities()
console.log(dates)
