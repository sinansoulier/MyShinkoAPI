export interface SummarizedAvailabilitiesResponse {
    date:   Date;
    isOpen: boolean;
    shifts: SummarizedShift[];
}

export interface SummarizedShift {
    shiftType:                string
    possible_guests:          any[];
}
