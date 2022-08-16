const environment = process.env

class AppConstants {
    static Shinko = class {
        /**
         * Shinko base URL
         * @type {string}
         */
        static baseURL = environment.SHINKO_BASE_URL

        /**
         * Shinko URL from given path
         * @param {string} path - Path to build URL from
         */
        static buildPath(path) {
            return AppConstants.Shinko.baseURL + path
        }
    }

    static Scraper = class {
        /**
         * Placeholder representing fake dates that can be retrieved from scraping
         * @type {string[]}
         */
        static placholderDates = [
            'mar. 20 septembre',
            'mer. 21 septembre',
            'jeu. 22 septembre',
            'lun. 26 septembre',
            'mar. 27 septembre',
            'mer. 28 septembre',
            'jeu. 29 septembre',
            'ven. 30 septembre'
        ]
    }
}

export { AppConstants }
