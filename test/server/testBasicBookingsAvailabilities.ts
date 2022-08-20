import { Server } from '../../src/server/middlewareServer.js';
import request from 'supertest';

process.env.NODE_TLS_REJECT_UNAUTHORIZED='0'

let server = new Server().shinkoMiddleware()

describe('GET /basicBookingsAvailbilities', () => {
    it('Should return scraped dates', (done) => {
        request(server)
            .get('/basicBookingsAvailabilities')
            .expect(200)
            .end(done)
    }).timeout(0)
});

describe('GET /basicBookingsAvailbilities', () => {
    it('Should return cached dates', (done) => {
        request(server)
            .get('/basicBookingsAvailabilities')
            .expect(200)
            .end(done)
    })
});

server.close()

