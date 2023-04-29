interface AvailabilitiesResponse<T> {
    date:   Date;
    isOpen: boolean;
    shifts: T[];
}

export {
    AvailabilitiesResponse,
}
