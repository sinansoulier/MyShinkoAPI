import { Server } from '../../src/server/middlewareServer.js';
import { AppConstants } from "../../src/utils/appConstants.js";
import request from 'supertest';

process.env.NODE_TLS_REJECT_UNAUTHORIZED='0'

let server = new Server().shinkoMiddleware()

describe(`GET ${AppConstants.Server.Routes.basicDaysBookingsAvailabilities}`, () => {
    it('Should return scraped dates', (done) => {
        request(server)
            .get(AppConstants.Server.Routes.basicDaysBookingsAvailabilities)
            .expect(200)
            .end(done)
    }).timeout(0)
});

describe(`GET ${AppConstants.Server.Routes.basicDaysBookingsAvailabilities}`, () => {
    it('Should return cached dates', (done) => {
        request(server)
            .get(AppConstants.Server.Routes.basicDaysBookingsAvailabilities)
            .expect(200)
            .end(done)
    })
});

server.close()
