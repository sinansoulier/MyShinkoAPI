class AppConstants {
    static Shinko = class {

        /**
         * Booking ZenChef base URL
         */
        static bookingZenChefURL: string  = 'https://bookings-middleware.zenchef.com/'

        static Path = class {
            /**
             * Shinko availabilities path
             */
            static availabilitiesPath = 'getAvailabilities'
            static summarizedAvailabilitiesPath = 'getAvailabilitiesSummary'
        }

        private static shinkoID: Number = 356608

        /**
         * Shinko summarized availabilities URL
         */
        static summarizedAvailabilitiesURL(beginDate: string, endDate: string): string {
            return `${this.bookingZenChefURL}${this.Path.summarizedAvailabilitiesPath}?restaurantId=${this.shinkoID}&date_begin=${beginDate}&date_end=${endDate}`
        }

        /**
         * Shinko availabilities URL
         */
        static availabilitiesURL(beginDate: string, endDate: string): string {
            return `${this.bookingZenChefURL}${this.Path.availabilitiesPath}?restaurantId=${this.shinkoID}&date_begin=${beginDate}&date_end=${endDate}`
        }
    }

    static Server = class {
        /**
         * Server port
         */
        static port: number = 3000

        static Routes = class {
            /**
             * Root route
             */
            static root: string = '/'

            /**
             * Get summarized availabilities route
             */
            static getAllSummarizedAvailabilities: string = '/getAllSummarizedAvailabilities'

            /**
             * Get summarized availabilities between dates route
             */
            static getSummarizedAvailabilitiesBetweenDates: string = '/getSummarizedAvailabilitiesBetweenDates'

            /**
             * Get all availabilities route
             */
            static getAllAvailabilities: string = '/getAllAvailabilities'

            /**
             * Get availabilities between dates route
             */
            static getAvailabilitiesBetweenDates: string = '/getAvailabilitiesBetweenDates'
        }
    }
}

export { AppConstants }
