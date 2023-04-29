// - Imports

// Modules
import { Request, Response } from "express";

// Files
import { AvailabilitiesBusiness } from "../Business/AvailabilitiesBusiness.js";
import { AvailabilitiesResponse } from "../Models/AvailabilitiesResponse.js";
import { SummarizedShift } from "../Models/SummarizedShift/SummarizedShift.js";

class AvailabilitiesController {
    /**
     * Get all summarized availabilities
     * @param req{Request} - Request
     * @param res{Response} - Response
     */
    static async getAllSummarizedAvailabilities(req: Request, res: Response) {
        try {
            let availabilities: AvailabilitiesResponse<SummarizedShift>[] = await AvailabilitiesBusiness.getAllSummarizedAvailabilities()
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
    static async getSummarizedAvailabilitiesBetweenDates(req: Request, res: Response) {
        try {
            let startDate: string = req.body.startDate
            let endDate: string = req.body.endDate
            let availabilities: AvailabilitiesResponse<SummarizedShift>[] = await AvailabilitiesBusiness.getSummarizedAvailabilitiesByDates(startDate, endDate)
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
     * Get summarized availabilities by number of guests
     * @param req{Request} - Request
     * @param res{Response} - Response
     */
    static async getSummarizedAvailabilitiesByNumberOfGuests(req: Request, res: Response) {
        try {
            let numberOfGuests: number[] = req.body.numberOfGuests
            let availabilities: AvailabilitiesResponse<SummarizedShift>[] = await AvailabilitiesBusiness.getSummarizedAvailabilitiesByNumberOfGuests(numberOfGuests)
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
    // static async getAllAvailabilities(req: Request, res: Response) {
    //     try {
    //         let availabilities: AvailabilitiesResponse[] = await AvailabilitiesBusiness.getAllAvailabilities()
    //         res.json(availabilities)
    //     } catch (err) {
    //         if (err.response) {
    //             if (err.response.status == 404)
    //                 res.status(404).json({error: "Not found"})
    //             else
    //                 res.status(err.response.status).json({error: err.message})
    //         } else {
    //             res.status(500).json({error: "Unknown error", message: err.message})
    //         }
    //     }
    // }

    /**
     * Get availabilities between range of dates
     * @param req{Request} - Request
     * @param res{Response} - Response
     */
    // static async getAvailabilitiesBetweenDates(req: Request, res: Response) {
    //     try {
    //         let startDate: string = req.body.startDate
    //         let endDate: string = req.body.endDate
    //         let availabilities: AvailabilitiesResponse[] = await AvailabilitiesBusiness.getAvailabilitiesByDates(startDate, endDate)
    //         res.json(availabilities)
    //     } catch (err) {
    //         if (err.response) {
    //             if (err.response.status == 404)
    //                 res.status(404).json({error: "Not found"})
    //             else
    //                 res.status(err.response.status).json({error: err.message})
    //         } else {
    //             res.status(500).json({error: "Unknown error", message: err.message})
    //         }
    //     }
    // }

    /**
     * Get availbilities by the number of guests
     * @param req{Request} - Request
     * @param res{Response} - Response
     */
    // static async getAvailabilitiesByNumberOfGuests(req: Request, res: Response) {
    //     try {
    //         let numberOfGuests: number[] = req.body.numberOfGuests
    //         let availabilities: AvailabilitiesResponse[] = await AvailabilitiesBusiness.getAvailabilitiesByNumberOfGuests(numberOfGuests)
    //         res.json(availabilities)
    //     } catch (err) {
    //         if (err.response) {
    //             if (err.response.status == 404)
    //                 res.status(404).json({error: "Not found"})
    //             else
    //                 res.status(err.response.status).json({error: err.message})
    //         } else {
    //             res.status(500).json({error: "Unknown error", message: err.message})
    //         }
    //     }
    // }
}

export {
    AvailabilitiesController,
}
