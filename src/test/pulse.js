import request from 'supertest'
import api from '../api'

describe('loading express', function () {
  it('responds to /', function testSlash(done) {
    request(api)
      .get('/')
      .expect(200, done);
  });
});