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

    static generateDatesFromTimeTable(dayDate, timeTable) {
        let dates = []
        for (let time of timeTable) {
            const splitMonthStr = dayDate.split(' ')
            const monthStr = splitMonthStr[splitMonthStr.length - 1]
            let dateStr = `${dayDate} ${DateUtils.getMonthYear(monthStr)} ${time} GMT-0000`
            let date = new Date(dateStr).toISOString()
            dates.push(date)
        }
        return dates
    }
}

export {
    DateUtils,
}