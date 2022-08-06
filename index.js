import { printBaseURL } from "./src/scraper/mainPage/fetcher.js";
import { fetchBookingPageBody } from "./src/scraper/bookingPage/fetcher.js";

// Test function call
printBaseURL()

let responseText = await fetchBookingPageBody()
console.log(responseText)