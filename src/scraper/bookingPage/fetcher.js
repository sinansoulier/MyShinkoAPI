// - Imports
// Modules
import fetch from 'node-fetch';

// Project functions
import { fetchBookingButtonHref } from "../mainPage/analysis.js";
import { AppConstants } from "../../utils/appConstants.js";

/**
 * Fetch booking page body
 */
async function fetchBookingPageBody() {
    let bookingPath = await fetchBookingButtonHref();
    if (bookingPath == null) {
        return null
    }
    let response = await fetch(AppConstants.Shinko.buildPath(bookingPath));
    return await response.text();
}

export {
    fetchBookingPageBody,
}