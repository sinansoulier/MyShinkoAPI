// - Imports
// Modules
import express from 'express';
import * as https from "https";
import fs from "fs";

// Files
import { AppConstants } from "../utils/appConstants.js";

// Server routes import
import { sayHello } from "./routes/root.js";
import { basicBookingsAvailabilities } from "./routes/basicBookingsAvailabilities.js";
import {Scraper} from "../scraper/bookingPage/extractBookings.js";

// - Server
class Server {
    app = express()

    static getOptions() {
        return {
            key: fs.readFileSync('myshinkomiddleware.sinan.key'),
            cert: fs.readFileSync('myshinkomiddleware.sinan.crt')
        }
    }

    shinkoMiddleware(): https.Server {
        this.app.get(AppConstants.Server.Routes.root, sayHello);
        this.app.get(AppConstants.Server.Routes.basicBookingsAvailabilities, basicBookingsAvailabilities);
        this.app.get('/daysBookingsAvailabilities', async (req, res) => {
            let bookings: string[] = await Scraper.extractDaysBookings()
            res.json({dates: bookings})
        });

        const certification = Server.getOptions()
        let server: https.Server = https.createServer(certification, this.app)

        return server.listen(AppConstants.Server.port, '0.0.0.0', () => {
            console.log(`Server running at https://localhost:${AppConstants.Server.port}/`)
        })
    }
}

export {
    Server,
}
