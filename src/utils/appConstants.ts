import NodeCache from "node-cache";

const environment = process.env

class AppConstants {
    static Shinko = class {
        /**
         * Shinko base URL
         */
        static baseURL: string = environment.SHINKO_BASE_URL

        /**
         * Shinko URL from given path
         * @param path - Path to build URL from
         * @returns - Built URL from given path
         */
        static buildPath(path: string): string {
            return AppConstants.Shinko.baseURL + path
        }
    }

    static Cache = class {
        /**
         * Booking dates cache key
         */
        static bookingDatesKey: string = environment.BOOKING_DATES_CACHE_KEY

        /**
         * Cache generater
         */
        static generateCache(): NodeCache {
            let cacheDuration = Number(environment.CACHE_DURATION)
            return new NodeCache({
                stdTTL: cacheDuration,
                checkperiod: cacheDuration + 20,
                deleteOnExpire: true });
        }
    }

    static Server = class {
        /**
         * Server port
         */
        static port: number = Number(environment.SERVER_PORT || '3000')
    }
}

export { AppConstants }
