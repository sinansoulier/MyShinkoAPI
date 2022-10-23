// - Imports
// Modules
import express from 'express';
import * as https from "https";
import fs from "fs";

// Files
import { AppConstants } from "../Utils/AppConstants.js";

// Server routes import
import { sayHello } from "./routes/root.js";
import { basicBookingsAvailabilities } from "./routes/basicBookingsAvailabilities.js";
import { basicDaysBookingsAvailabilities } from "./routes/basicDaysBookingsAvailabilities.js";

// - Server
class Server {
    app = express()

    static getOptions() {
        const basePath = AppConstants.Server.certifcationBasePath
        return {
            key: fs.readFileSync(basePath + '/myshinkomiddleware.sinan.key', 'utf8'),
            cert: fs.readFileSync(basePath + '/myshinkomiddleware.sinan.crt', 'utf8')
        }
    }

    shinkoMiddleware(): https.Server {
        const routes = AppConstants.Server.Routes
        this.app.get(routes.root, sayHello);
        this.app.get(routes.basicBookingsAvailabilities, basicBookingsAvailabilities);
        this.app.get(routes.basicDaysBookingsAvailabilities, basicDaysBookingsAvailabilities);

        const certification = Server.getOptions()
        let server: https.Server = https.createServer(certification, this.app)

        return server.listen(AppConstants.Server.port, () => {
            console.log(`Server running at https://localhost:${AppConstants.Server.port}/`)
        })
    }
}

export {
    Server,
}
