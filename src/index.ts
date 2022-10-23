import { AvailabilitiesBusiness} from "./Business/AvailabilitiesBusiness.js";
import { AvailabilitiesResponse } from "./Models/AvailabilitiesResponse.js";

// let beginDate = "2022-12-10"
// let endDate = "2022-12-25"
let numberOfGuests = [4, 5]

// let availabilitiesResponses: AvailabilitiesResponse[] = await AvailabilitiesBusiness.getAvailabilitiesByNumberOfGuests(numberOfGuests)
let availabilitiesResponses: AvailabilitiesResponse[] = await AvailabilitiesBusiness.getAvailabilitiesByNumberOfGuests(numberOfGuests)
console.log(availabilitiesResponses)
