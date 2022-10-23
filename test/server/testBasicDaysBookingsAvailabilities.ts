import { Server } from '../../src/server/middlewareServer.js';
import { AppConstants } from "../../src/Utils/AppConstants.js";
import request from 'supertest';

let server = new Server().shinkoMiddleware()

describe(`GET ${AppConstants.Server.Routes.basicDaysBookingsAvailabilities}`, () => {
    it('Should return scraped dates', (done) => {
        request(server)
            .get(AppConstants.Server.Routes.basicDaysBookingsAvailabilities)
            .trustLocalhost()
            .expect(200)
            .end(done)
    }).timeout(0)
});

describe(`GET ${AppConstants.Server.Routes.basicDaysBookingsAvailabilities}`, () => {
    it('Should return cached dates', (done) => {
        request(server)
            .get(AppConstants.Server.Routes.basicDaysBookingsAvailabilities)
            .trustLocalhost()
            .expect(200)
            .end(done)
    })
});

server.close()
