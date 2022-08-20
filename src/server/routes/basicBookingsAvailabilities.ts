// - Imports

// Modules
import { Request, Response } from "express";

// Files
import { AppConstants } from "../../utils/appConstants.js";
import { Scraper } from "../../scraper/bookingPage/analysis.js";
import { FunctionUtils } from "../../utils/functions.js";

// Constants
const cache = FunctionUtils.Cache.generateCache()

/**
 * Basic bookings availabilities route
 * @param req
 * @param res
 */
async function basicBookingsAvailabilities(req: Request, res: Response) {
    try {
        // Try getting cached dates
        let cachedDates = cache.get(AppConstants.Cache.bookingDatesKey)
        if (cachedDates == undefined) {
            // Scrape dates if not cached
            let bookingDates: string[] = await Scraper.extractBookingAvailabilities()
            let dateObj = { dates : bookingDates }
            cache.set(AppConstants.Cache.bookingDatesKey, dateObj)
            console.log("Fetched dates from scraper")
            res.json(dateObj)
        } else {
            // Send cached dates if cached
            console.log("Fetched dates from cache")
            res.json(cachedDates)
        }
    } catch (err) {
        if (err.response) {
            if (err.response.status == 404)
                res.status(404).json({error: "Not found"})
            else
                res.status(err.response.status).json({error: err.message})
        } else {
            res.status(500).json({error: "Unknown error"})
        }
    }
}

export {
    basicBookingsAvailabilities,
}
