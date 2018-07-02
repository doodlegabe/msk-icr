import request from 'supertest'
import app from '../api'


describe('Posting to /transcription with valid and invalid imageUris', function () {
  let api;
  beforeEach(function () {
    api = app.listen();
  });
  afterEach(function (done) {
    api.close(done);
  });
  it('posts an invalid uri', function testInvalidImageUri(done) {
    request(api)
      .post('/transcribe')
      .send({
          "imageUri" : 'this shouldn\'t work'
        })
      .expect(500, done);
  });
  it('posts a valid uri', function testInvalidImageUri(done) {
    request(api)
      .post('/transcribe')
      .set('Accept', 'application/json')
      .send({
        "imageUri" : 'http://www.moleskine.com/image.jpeg'
      })
      .expect(function(res){
        res.body.success = true;
      })
      .expect(200, {success: true}, done())
  });
});

describe('Posting to /transcription valid and invalid providers', function () {
  let api;
  beforeEach(function () {
    api = app.listen();
  });
  afterEach(function (done) {
    api.close(done);
  });
  it('posts an invalid provider', function testInvalidImageUri(done) {
    request(api)
      .post('/transcribe')
      .set('Accept', 'application/json')
      .send({
        "imageUri" : 'http://www.moleskine.com/image.jpeg',
        "providers" : JSON.stringify(['no'])
      })
      .expect(500, done())
  });
  it('posts a valid provider', function testInvalidImageUri(done) {
    request(api)
      .post('/transcribe')
      .set('Accept', 'application/json')
      .send({
        "imageUri" : 'http://www.moleskine.com/image.jpeg',
        "providers" : JSON.stringify(['flexi'])
      })
      .expect(function(res){
        res.body.success = true;
      })
      .expect(200, {success: true}, done())
  });
  it('post string instead of an array', function testInvalidImageUri(done) {
    request(api)
      .post('/transcribe')
      .set('Accept', 'application/json')
      .send({
        "imageUri" : 'http://www.moleskine.com/image.jpeg',
        "providers" : JSON.stringify('no')
      })
      .expect(500, done())
  });
});