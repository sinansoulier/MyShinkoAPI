class DateUtils {
    /**
     * Current day date
     * @returns{Date} - Current day date
     */
    static getCurrentDayDate(): Date {
        let currentDate: Date = new Date()
        currentDate.setHours(0, 0, 0, 0)
        return currentDate
    }

    /**
     * Add days to given date
     * @param date{Date} - Date to add days to
     * @param days{number} - Number of days to add
     */
    static addDaysToDate(date: Date, days: number): Date {
        let newDate: Date = new Date(date)
        newDate.setDate(newDate.getDate() + days)
        return newDate
    }

    /**
     * Get YYYY-MM-DD date string from given date
     * @param date - Date to get string from
     * @returns - YYYY-MM-DD date string
     */
    static getDateString(date: Date): string {
        return date.toISOString().split('T')[0]
    }
}

export {
    DateUtils,
}
