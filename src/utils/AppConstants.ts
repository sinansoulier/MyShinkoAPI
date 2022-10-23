const environment = process.env

class AppConstants {
    static Shinko = class {
        /**
         * Shinko base URL
         */
        static baseURL: string = environment.SHINKO_BASE_URL

        /**
         * Booking ZenChef base URL
         */
        static bookingZenChefURL: string  = 'https://bookings-middleware.zenchef.com/'

        static Path = class {
            /**
             * Shinko availabilities path
             */
            static availabilitiesPath = 'getAvailabilities'
        }

        private static shinkoID: Number = 356608

        /**
         * Shinko availabilities URL
         */
        static availabilitiesURL(beginDate: string, endDate: string): string {
            return `${this.bookingZenChefURL}${this.Path.availabilitiesPath}?restaurantId=${this.shinkoID}&date_begin=${beginDate}&date_end=${endDate}`
        }
    }

    static Cache = class {
        /**
         * Booking dates cache key
         */
        static bookingDatesKey: string = "bookingDatesKey"

        static bookingDaysKey: string = "bookingDaysKey"
    }

    static Server = class {
        /**
         * Server port
         */
        static port: number = Number(environment.SERVER_PORT || '3000')

        /**
         * Certification base path
         */
        static certifcationBasePath: string = environment.CERTIFICATION_PATH || 'certs'

        static Routes = class {
            /**
             * Root route
             */
            static root: string = '/'

            /**
             * Basic bookings availabilities route
             */
            static basicBookingsAvailabilities: string = '/basicBookingsAvailabilities'

            /**
             * Basic days bookings availabilities route
             */
            static basicDaysBookingsAvailabilities: string = '/basicDaysBookingsAvailabilities'
        }
    }
}

export { AppConstants }
