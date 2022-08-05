import { fetchBody } from "./pageFetcher.js";

/**
 * Get booking button information
 */

async function fetchBookingButton() {
    let responseText = await fetchBody()
    console.log(responseText)
}

export {
    fetchBookingButton,
}