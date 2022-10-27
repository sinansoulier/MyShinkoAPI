export interface AvailabilitiesResponse {
    date:    Date;
    shifts:  Shift[];
}

export interface Shift {
    name:              ShiftName;
    marked_as_full:    boolean;
    shift_slots:       ShiftSlot[];
}

export enum SlotNames {
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

export enum ShiftName {
    Dejeuner = "déjeuner",
    Soir = "Soir",
    SoirWeekend = "Soir Weekend",
}

export interface ShiftSlot {
    name:                     SlotNames;
    marked_as_full:           boolean;
    possible_guests:          number[];
}
