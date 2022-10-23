// - Imports

// Modules
import { Request, Response } from "express";

// Files
import { AvailabilitiesBusiness } from "../Business/AvailabilitiesBusiness.js";
import { AvailabilitiesResponse } from "../Models/AvailabilitiesResponse.js";
import { SummarizedAvailabilitiesResponse } from "../Models/SummarizedAvailabilitiesResponse.js";

class AvailabilitiesController {
    /**
     * Get all summarized availabilities
     * @param req{Request} - Request
     * @param res{Response} - Response
     */
    static async getAllSummarizedAvailabilities(req: Request, res: Response) {
        try {
            let availabilities: SummarizedAvailabilitiesResponse[] = await AvailabilitiesBusiness.getAllSummarizedAvailabilities()
            // FIXME: Simplify response model
            res.json(availabilities)
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

    /**
     * Get all availabilities
     * @param req{Request} - Request
     * @param res{Response} - Response
     */
    static async getAllAvailabilities(req: Request, res: Response) {
        try {
            let availabilities: AvailabilitiesResponse[] = await AvailabilitiesBusiness.getAllAvailabilities()
            // FIXME: Simplify response model
            res.json(availabilities)
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

    /**
     * Get all availabilities between range of dates
     * @param req{Request} - Request
     * @param res{Response} - Response
     */
    static async getAvailabilitiesBetweenDates(req: Request, res: Response) {
        try {
            let startDate: string = req.body.startDate
            let endDate: string = req.body.endDate
            let availabilities: AvailabilitiesResponse[] = await AvailabilitiesBusiness.getAvailabilitiesByDates(startDate, endDate)
            res.json(availabilities)
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
}

export {
    AvailabilitiesController,
}
