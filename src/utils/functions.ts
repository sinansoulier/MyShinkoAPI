// - Environment
const environment = process.env

// - Imports

// Modules
import jsdom from 'jsdom';
import NodeCache from "node-cache";

// Files
import { AppConstants } from "./appConstants.js";

// - Constants
const { JSDOM } = jsdom;

// - Functions
class FunctionUtils {
    static Scraper = class {
        /**
         * Shinko URL from given path
         * @param path - Path to build URL from
         * @returns - Built URL from given path
         */
        static buildPath(path: string): string {
            return AppConstants.Shinko.baseURL + path
        }
    }

    static DOM = class {
        /**
         * Generate JSDOM document
         * @param {string} body - Page body as a string of characters
         */
        static generateDocument(body: string): Document {
            const dom = new JSDOM(body)
            return dom.window.document
        }
    }

    static Cache = class {
        /**
         * Cache generator
         */
        static generateCache(): NodeCache {
            let cacheDuration = Number(environment.CACHE_DURATION)
            return new NodeCache({
                stdTTL: cacheDuration,
                checkperiod: cacheDuration + 20,
                deleteOnExpire: true
            });
        }
    }
}

export {
    FunctionUtils,
}
