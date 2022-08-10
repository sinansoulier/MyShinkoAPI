class DateUtils {
    static LabeledMonths = {
        "janvier" : 1,
        "février" : 2,
        "mars" : 3,
        "avril" : 4,
        "mai" : 5,
        "juin" : 6,
        "juillet" : 7,
        "août" : 8,
        "septembre" : 9,
        "octobre" : 10,
        "novembre" : 11,
        "décembre" : 12
    }

    static getMonthYear(monthString) {
        const currentDate = new Date()
        let year = currentDate.getFullYear()
        let increment = DateUtils.LabeledMonths[monthString] < currentDate.getMonth() ? 1 : 0
        return year + increment
    }

    static generateDatesFromTimeTable(dayDates, timeTable) {
        let dates = []
        if (dayDates.length > 0) {
            for (let i = 0; i < dayDates.length; i++) {
                for (let time of timeTable[i]) {
                    const splitMonthStr = dayDates.split(' ')
                    const monthStr = splitMonthStr[splitMonthStr.length - 1]
                    let dateStr = `${dayDates} ${DateUtils.getMonthYear(monthStr)} ${time} GMT-0000`
                    let date = new Date(dateStr).toISOString()
                    dates.push(date)
                }
            }
        } else {
            let currentDayDateStr = new Date().toISOString().split('T')[0]
            for (let time of timeTable) {
                let dateStr = `${currentDayDateStr} ${time} GMT-0000`
                let date = new Date(dateStr).toISOString()
                dates.push(date)
            }
        }
        return dates
    }
}

export {
    DateUtils,
}