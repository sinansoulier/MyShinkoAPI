export interface AvailabilitiesResponse {
    date:    Date;
    isOpen?: IsOpen;
    shifts:  Shift[];
}

export enum IsOpen {
    Closed = "closed",
}

export interface Shift {
    id:                number;
    total:             number;
    waitlist_total:    number;
    open:              Close;
    close:             Close;
    color:             Color;
    is_standard:       boolean;
    name:              Name;
    comment:           string;
    marked_as_full:    boolean;
    capacity:          Capacity;
    blocked_tables:    BlockedTable[];
    charge_param:      ChargeParam;
    cancelation_param: CancelationParam;
    is_offer_required: number;
    shift_slots:       ShiftSlot[];
}

export interface BlockedTable {
    id:       number;
    shift_id: number;
    table_id: number;
    date:     Date;
    message:  null | string;
}

export interface CancelationParam {
    enduser_cancelable_before:    number;
    enduser_cancelable_reference: EnduserCancelableReference;
}

export enum EnduserCancelableReference {
    Shift = "shift",
}

export interface Capacity {
    min:                     number;
    max:                     number;
    total_per_slot:          number;
    waitlist_min:            number;
    waitlist_max:            number;
    waitlist_total_per_slot: number;
    turn_times:              TurnTimes;
}

export interface TurnTimes {
    "2_pax_slots":  number;
    "4_pax_slots":  number;
    "6_pax_slots":  number;
    "8_pax_slots":  number;
    "10_pax_slots": number;
    "12_pax_slots": number;
}

export interface ChargeParam {
    is_web_booking_askable: boolean;
    min_guests:             number;
    charge_per_guests:      number;
}

export enum Close {
    The1200 = "12:00",
    The1215 = "12:15",
    The1230 = "12:30",
    The1245 = "12:45",
    The1300 = "13:00",
    The1315 = "13:15",
    The1330 = "13:30",
    The1900 = "19:00",
    The1915 = "19:15",
    The1930 = "19:30",
    The1945 = "19:45",
    The2000 = "20:00",
    The2015 = "20:15",
    The2030 = "20:30",
    The2045 = "20:45",
    The2100 = "21:00",
    The2115 = "21:15",
    The2130 = "21:30",
    The2145 = "21:45",
}

export enum Color {
    A = "a",
    F = "f",
}

export enum Name {
    Dejeuner = "déjeuner",
    Soir = "Soir",
    SoirWeekend = "Soir Weekend",
}

export interface ShiftSlot {
    capacity:                 Capacity;
    name:                     Close;
    slot_name:                Close;
    interval_in_minutes:      number;
    closed:                   boolean;
    occupation:               Occupation;
    marked_as_full:           boolean;
    possible_guests:          number[];
    waitlist_possible_guests: any[];
    available_rooms:          any[] | { [key: string]: number[] };
}

export interface Occupation {
    scheduled: Scheduled;
    seated:    Scheduled;
    waitlist:  Waitlist;
}

export interface Scheduled {
    bookings:  ScheduledBooking[];
    available: number;
}

export interface ScheduledBooking {
    nb_guests:          number;
    slots_count:        number | null;
    id:                 number;
    tables:             number[];
    is_not_destockable: boolean;
    wish:               Wish;
    offers:             any[];
}

export interface Wish {
    booking_room_id: null;
}

export interface Waitlist {
    bookings:           WaitlistBooking[];
    available:          number;
    available_per_slot: number;
}

export interface WaitlistBooking {
    nb_guests:   number;
    slots_count: null;
    id:          number;
    wish:        Wish;
    offers:      any[];
}
