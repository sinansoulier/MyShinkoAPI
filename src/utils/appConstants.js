const environment = process.env

class AppConstants {
    static Shinko = class {
        static baseURL = environment.SHINKO_BASE_URL
    }
}

export { AppConstants }