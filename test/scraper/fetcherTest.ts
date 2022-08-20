import { fetchBody } from "../../src/scraper/mainPage/fetcher.js";

let _ = await fetchBody();
console.log("Main page fetcher: OK")
