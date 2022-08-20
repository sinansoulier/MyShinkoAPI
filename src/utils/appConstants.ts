import NodeCache from "node-cache";

const environment = process.env

class AppConstants {
    static Shinko = class {
        /**
         * Shinko base URL
         */
        static baseURL: string = environment.SHINKO_BASE_URL


    }

    static Cache = class {
        /**
         * Booking dates cache key
         */
        static bookingDatesKey: string = environment.BOOKING_DATES_CACHE_KEY
    }

    static Server = class {
        /**
         * Server port
         */
        static port: number = Number(environment.SERVER_PORT || '3000')

        static Routes = class {
            /**
             * Root route
             */
            static root: string = '/'

            /**
             * Basic bookings availabilities route
             */
            static basicBookingsAvailabilities: string = '/basicBookingsAvailabilities'
        }
    }
}

export { AppConstants }
