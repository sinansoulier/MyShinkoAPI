import { Server } from '../../src/server/middlewareServer.js';
import request from 'supertest';

process.env.NODE_TLS_REJECT_UNAUTHORIZED='0'

let server = new Server().shinkoMiddleware()
describe('GET /', () => {
    it('Should return Hello World', (done) => {
        request(server)
            .get('/')
            .expect(200)
            .expect('Hello World from server!', done)
    }).timeout(5000);
});

server.close()
