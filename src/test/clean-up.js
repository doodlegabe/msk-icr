import request from 'supertest';
import app from '../api';
import fs from 'fs';


describe('Posting to /delete-temp a file deletes that file', function () {
  let api;
  beforeEach(function () {
    api = app.listen();
  });
  afterEach(function (done) {
    api.close(done);
  });
  it('can delete a tmp file', function testInvalidImageUri(done) {
    let fileContent = "this is a test file";
    let filePath = 'tmp/test.txt';
    fs.writeFile(filePath, fileContent, (err) => {
      if (err) throw err;
      request(api)
        .post('/delete-temp')
        .send({
          "filePath": 'tmp/test.txt'
        })
        .expect(201, {
          success: true
        }, done);
    });
  });
  it('can not delete a non-existent file', function testInvalidImageUri(done) {
    request(api)
      .post('/transcribe')
      .send({
        "filePath": 'thisshouldnothappen'
      })
      .expect(500, done);
  });
});