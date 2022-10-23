// - Imports
// Project functions
import { fetchBody } from "./fetcher.js";
import { FunctionUtils } from "../../Utils/FunctionUtils.js";

/**
 * Get booking button information
 * @returns {Promise<string>} - Booking button information
 */
async function fetchBookingButtonHref(): Promise<string> {
    let responseText = await fetchBody()
    let document = FunctionUtils.DOM.generateDocument(responseText)

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
