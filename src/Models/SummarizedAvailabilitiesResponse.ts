export interface SummarizedAvailabilitiesResponse {
    date:   Date;
    isOpen: boolean;
    shifts: SummarizedShift[];
}

export interface SummarizedShift {
    id:                       number;
    possible_guests:          any[];
    waitlist_possible_guests: any[];
    closedBookingsAfter:      number;
    closedBookingsBefore:     number;
}
