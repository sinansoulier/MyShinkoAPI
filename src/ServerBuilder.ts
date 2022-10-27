// - Imports
// Modules
import express from "express";
import * as http from "http";

// Files
import { AppConstants } from "./Utils/AppConstants.js";

import { AvailabilitiesController } from "./Controllers/AvailabilitiesController.js";

class ServerBuilder {
    private static app = express()

    static build(): http.Server {
        const routes = AppConstants.Server.Routes

        this.app.use(express.json())

        this.app.get(routes.getAllSummarizedAvailabilities, AvailabilitiesController.getAllSummarizedAvailabilities)
        this.app.get(routes.getSummarizedAvailabilitiesBetweenDates, AvailabilitiesController.getSummarizedAvailabilitiesBetweenDates)
        this.app.get(routes.getAllAvailabilities, AvailabilitiesController.getAllAvailabilities);
        this.app.get(routes.getAvailabilitiesBetweenDates, AvailabilitiesController.getAvailabilitiesBetweenDates);

        return http.createServer(this.app)
    }

    static start(server: http.Server): void {
        server.listen(AppConstants.Server.port, () => {
            console.log(`Server running at http://localhost:${AppConstants.Server.port}/`)
        })
    }
}

export {
    ServerBuilder,
}
