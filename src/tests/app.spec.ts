import request from 'supertest';
import app from '../app';
import { describe, it } from 'mocha';

describe('GET /api', () => {
  it('should return status 200', (done) => {
    request(app)
      .get('/api')
      .expect(200, done);
  });
});