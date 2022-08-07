const environment = process.env

class AppConstants {
    static Shinko = class {
        /**
         * Shinko base URL
         * @type {string}
         */
        static baseURL = environment.SHINKO_BASE_URL

        /**
         * Shinko HTML booking button class
         * @type {string}
         */
        static bookingButtonClass = environment.SHINKO_BOOKING_BUTTON_CLASS

        /**
         * Shinko URL from given path
         * @param {string} path - Path to build URL from
         */
        static buildPath(path) {
            return AppConstants.Shinko.baseURL + path
        }
    }
}

export { AppConstants }