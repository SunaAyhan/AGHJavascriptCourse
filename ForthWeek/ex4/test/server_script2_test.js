const supertest = require('supertest');
const assert = require('assert'); // You'll need to use Node.js built-in 'assert' module for assertions.

const server = supertest('http://localhost:8000');

describe('GET /', () => {
    it('responds with "HTML form"', (done) => {
        server
            .get('/')
            .expect('Content-Type', /html/)
            .expect(200, /form/)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                done();
            });
    });
// });

describe('GET /submit', () => {
    it('responds with welcome', (done) => {
        server
            .get('/submit')
            .query({ name: 'róża' })
            .expect(200, 'Hello róża')
            .end((err, res) => {
                if (err) return done(err);
                done();
            });
    });
});
describe('POST /', () => {
    it('responds with welcome', (done) => {
        server
            .post('/')
            .type('form')
            .send({ name: 'róża' })
            .expect(200, 'Hello róża')
            .end((err, res) => {
                if (err) return done(err);
                return done();
            });
    });
});