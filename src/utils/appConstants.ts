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
}

export { AppConstants }
