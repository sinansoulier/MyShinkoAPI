import { SummarizedShift } from "./SummarizedShift.js";

interface SummarizedAvailabilitiesResponse {
    date:   Date;
    isOpen: boolean;
    shifts: SummarizedShift[];
}

export {
    SummarizedAvailabilitiesResponse,
}
