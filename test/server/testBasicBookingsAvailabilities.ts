import { Server } from '../../src/server/middlewareServer.js';
import request from 'supertest';
import { AppConstants } from "../../src/utils/appConstants.js";

process.env.NODE_TLS_REJECT_UNAUTHORIZED='0'

let server = new Server().shinkoMiddleware()

describe(`GET ${AppConstants.Server.Routes.basicBookingsAvailabilities}`, () => {
    it('Should return scraped dates', (done) => {
        request(server)
            .get(AppConstants.Server.Routes.basicBookingsAvailabilities)
            .expect(200)
            .end(done)
    }).timeout(0)
});

describe(`GET ${AppConstants.Server.Routes.basicBookingsAvailabilities}`, () => {
    it('Should return cached dates', (done) => {
        request(server)
            .get(AppConstants.Server.Routes.basicBookingsAvailabilities)
            .expect(200)
            .end(done)
    })
});

server.close()

