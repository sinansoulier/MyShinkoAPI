import request from 'supertest';
import { AppConstants } from "../../src/Utils/AppConstants.js";
import {ServerBuilder} from "../../src/ServerBuilder.js";

let server = ServerBuilder.build()
ServerBuilder.start(server)

describe(`GET ${AppConstants.Server.Routes.getAllAvailabilities}`, () => {
    it('Should return all available bookings from Shinko', (done) => {
        request(server)
            .get(AppConstants.Server.Routes.getAllAvailabilities)
            .expect(200)
            .end(done)
    })
});

server.close()
