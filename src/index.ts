import { printBaseURL } from "./scraper/mainPage/fetcher.js";
import { Server } from "./server/middlewareServer.js";

// Test function call
printBaseURL()

let server = new Server()
server.shinkoMiddleware()
