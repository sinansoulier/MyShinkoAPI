import { Server } from '../../src/server/middlewareServer.js';
import request from 'supertest';
import { AppConstants } from "../../src/utils/appConstants.js";

let server = new Server().shinkoMiddleware()

describe(`GET ${AppConstants.Server.Routes.basicBookingsAvailabilities}`, () => {
    it('Should return scraped dates', (done) => {
        request(server)
            .get(AppConstants.Server.Routes.basicBookingsAvailabilities)
            .trustLocalhost()
            .expect(200)
            .end(done)
    }).timeout(0)
});

describe(`GET ${AppConstants.Server.Routes.basicBookingsAvailabilities}`, () => {
    it('Should return cached dates', (done) => {
        request(server)
            .get(AppConstants.Server.Routes.basicBookingsAvailabilities)
            .trustLocalhost()
            .expect(200)
            .end(done)
    })
});

server.close()

