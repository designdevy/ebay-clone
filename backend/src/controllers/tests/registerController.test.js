import request from 'supertest';
import { registerService } from '../../services/registerService';
import app from '../../app';

describe('POST /api/register', () => {
  it('without username and password responds with error', (done) => {
    request(app)
      .post('/api/register')
      .set('Accept', 'application/json')
      .send({})
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err) => {
        if (err) return done(err);
        return done();
      });
  });
});
describe('POST /api/register', () => {
  it('without password responds with error', (done) => {
    request(app)
      .post('/api/register')
      .set('Accept', 'application/json')
      .send({ username: 'kornel' })
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err) => {
        if (err) return done(err);
        return done();
      });
  });
});

describe('POST /api/register', () => {
  it('without username responds with error', (done) => {
    request(app)
      .post('/api/register')
      .set('Accept', 'application/json')
      .send({ password: 'kornel' })
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err) => {
        if (err) return done(err);
        return done();
      });
  });
});
describe('POST /api/register', () => {
  it('without less than 8 caracter password responds with error', (done) => {
    request(app)
      .post('/api/register')
      .set('Accept', 'application/json')
      .send({ username: 'kornel', password: '1234567' })
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err) => {
        if (err) return done(err);
        return done();
      });
  });
});

describe('POST /api/register', () => {
  it('with valid username and password responds with the new user', (done) => {
    registerService.registerUser = jest.fn(() => 'hello');
    request(app)
      .post('/api/register')
      .set('Accept', 'application/json')
      .send({ username: 'kornel', password: 'asdasdasd' })
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err) => {
        if (err) return done(err);
        return done();
      });
  });
});
