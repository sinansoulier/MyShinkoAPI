// - Imports
import { fetchBody } from "./fetcher.js";
import { generateDocument } from "../../utils/functions.js";
import {AppConstants} from "../../utils/appConstants.js";

/**
 * Get booking button information
 */
async function fetchBookingButtonHref() {
    let responseText = await fetchBody()
    let document = generateDocument(responseText)

    let buttonWrapperList = document.getElementsByClassName('buttons-wrap-header')
    let buttonWrapper = [...buttonWrapperList].flatMap(button => button.querySelector('a').href);
    if (!buttonWrapper.length) {
        console.log("PageAnalysis: No booking button found")
        return null
    }
    return buttonWrapper[0]
}

export {
    fetchBookingButtonHref,
}