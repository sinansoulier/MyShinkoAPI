import { AvailabilitiesData } from "./DataAccess/AvailabilitiesData.js";

let availabilities = await AvailabilitiesData.getAvailabilities("2022-10-25", "2022-11-25")
console.log(availabilities)
