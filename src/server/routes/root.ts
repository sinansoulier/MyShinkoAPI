import { Request, Response } from "express";

/**
 * Root route
 * @param req
 * @param res
 */
function sayHello(req: Request, res: Response) {
    res.send("Hello World from server!");
}

export {
    sayHello,
}
