import { Server } from '../../src/server/middlewareServer.js';
import request from 'supertest';

let server = new Server().shinkoMiddleware()
describe('GET /', () => {
    it('Should return Hello World', (done) => {
        request(server)
            .get('/')
            .trustLocalhost()
            .expect(200)
            .expect('Hello World from server!', done)
    }).timeout(5000);
});

server.close()
