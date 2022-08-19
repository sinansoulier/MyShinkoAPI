// - Imports
// Modules
import express from 'express';
import * as https from "https";
import fs from "fs";

// Files
import { AppConstants } from "../utils/appConstants.js";
import { Scraper } from "../scraper/bookingPage/analysis.js";

// - Server
class Server {
    app = express()
    cache = AppConstants.Cache.generateCache()

    static getOptions() {
        return {
            key: fs.readFileSync('myshinkomiddleware.sinan.key'),
            cert: fs.readFileSync('myshinkomiddleware.sinan.crt')
        }
    }

    myShinkoMiddleware(): https.Server {
        this.app.get('/', (req, res) => {
            res.send('Hello World from server!\n');
        });

        this.app.get('/basicBookingsAvailabilities', async (req, res) => {
            try {
                // Try getting cached dates
                let cachedDates = this.cache.get(AppConstants.Cache.bookingDatesKey)
                if (cachedDates == undefined) {
                    // Scrape dates if not cached
                    let bookingDates: string[] = await Scraper.extractBookingAvailabilities()
                    let dateObj = { dates : bookingDates }
                    this.cache.set(AppConstants.Cache.bookingDatesKey, dateObj)
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
        });

        const certification = Server.getOptions()
        let server: https.Server = https.createServer(certification, this.app)
        return server.listen(AppConstants.Server.port, () => {
            console.log(`Server running on port ${AppConstants.Server.port}`)
        })
    }
}

export {
    Server,
}
