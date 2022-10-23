// - Imports

// Modules
import { Request, Response } from "express";

// Files
import { AppConstants } from "../../Utils/AppConstants.js";
import { Scraper } from "../../scraper/bookingPage/extractBookings.js";
import { FunctionUtils } from "../../Utils/FunctionUtils.js";

const cache = FunctionUtils.Cache.generateCache()

/**
 * Basic bookings days availabilities route
 * @param req
 * @param res
 */
async function basicDaysBookingsAvailabilities(req: Request, res: Response) {
    try {
        // Try getting cached dates
        let cachedDates = cache.get(AppConstants.Cache.bookingDaysKey)
        if (cachedDates == undefined) {
            // Scrape dates if not cached
            let bookingDayDates: string[] = await Scraper.extractDaysBookings()
            let dateObj = { dayDates : bookingDayDates }
            cache.set(AppConstants.Cache.bookingDaysKey, dateObj)
            console.log("Fetched day dates from scraper")
            res.json(dateObj)
        } else {
            // Send cached dates if cached
            console.log("Fetched day dates from cache")
            res.json(cachedDates)
        }
    } catch (err) {
        if (err.response) {
            if (err.response.status == 404)
                res.status(404).json({error: "Not found"})
            else
                res.status(err.response.status).json({error: err.message})
        } else {
            res.status(500).json({error: "Unknown error", message: err.message})
        }
    }
}

export {
    basicDaysBookingsAvailabilities,
}

