enum LabeledMonths {
    Janvier = 1,
    Février = 2,
    Mars = 3,
    Avril = 4,
    Mai = 5,
    Juin = 6,
    Juillet = 7,
    Août = 8,
    Septembre = 9,
    Octobre = 10,
    Novembre = 11,
    Décembre = 12,
}

enum MonthsToEnglish {
    janvier = 'January',
    février = 'February',
    mars = 'March',
    avril = 'April',
    mai = 'May',
    juin = 'June',
    juillet = 'July',
    août = 'August',
    septembre = 'September',
    octobre = 'October',
    novembre = 'November',
    décembre = 'December',
}


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

    /**
     * Get year of given month
     * @param monthString
     * @returns - Year of given month
     */
    static getMonthYear(monthString: string): number {
        const currentDate: Date = new Date()
        let year: number = currentDate.getFullYear()
        let increment: number = LabeledMonths[monthString] < currentDate.getMonth() ? 1 : 0
        return year + increment
    }

    /**
     * Generates a list of ISO formatted dates from day dates and a timetable
     * @param dayDates - List of day dates
     * @param timeTable - List of timetable rows
     * @returns - List of ISO formatted dates
     */
    static generateDatesFromTimeTable(dayDates: string[], timeTable: string[][]): string[] {
        let dates: string[] = []
        if (dayDates.length > 0) {
            for (let i = 0; i < dayDates.length; i++) {
                for (let time of timeTable[i]) {
                    let splitDate: string[] = dayDates[i].split(' ').slice(1)
                    let dayDate: string = splitDate[0]
                    let monthDate: string = MonthsToEnglish[splitDate[1]]
                    let dateStr = `${dayDate} ${monthDate} ${DateUtils.getMonthYear(monthDate)} ${time} GMT-0000`
                    let date: string = new Date(dateStr).toISOString()
                    dates.push(date)
                }
            }
        } else {
            let currentDayDateStr = new Date().toISOString().split('T')[0]
             let flatTimeTable = timeTable.flatMap(time => time)
            for (let time of flatTimeTable) {
                let dateStr: string = `${currentDayDateStr} ${time} GMT-0000`
                let date: string = new Date(dateStr).toISOString()
                dates.push(date)
            }
        }
        return dates
    }
}

export {
    DateUtils,
}
