import request from 'supertest'
import api from '../api'
import Transcription from '../models/transcription';
import dbConnect from '../db-connect';

describe('Creating, Reading, Updating, and Deleting Transcriptions', function () {
  // it('creates a transcription from a valid post', function testCreateValid(done) {
  //   request(api)
  //     .post('/transcription/create')
  //     .expect(200, done);
  // });
  // it('does not create an transcription from an invalid post', function testCreateInvalid(done) {
  //   request(api)
  //     .post('/transcription/create')
  //     .expect(200, done);
  // });
  // it('retrieves an existing transcription', function testRetrieveExisting(done) {
  //   request(api)
  //     .get('/transcription/1')
  //     .expect(200, done);
  // });
  // it('fails to retrieve a non-existing transcription', function testRetrieveNonExisting(done) {
  //   request(api)
  //     .get('/transcription/1')
  //     .expect(200, done);
  // });
  // it('it updates an existing transcription with a valid post', function testUpdateExistingValid(done) {
  //   request(api)
  //     .post('/transcription/update/1')
  //     .expect(200, done);
  // });
  // it('it fails to update an existing transcription with an invalid post', function testUpdateExistingInvalid(done) {
  //   request(api)
  //     .post('/transcription/update/1')
  //     .expect(200, done);
  // });
  // it('it deletes an existing transcription', function testDeleteExisting(done) {
  //   request(api)
  //     .post('/transcription/delete/1')
  //     .expect(200, done);
  // });
  // it('it fails to delete a non-existing transcription', function testDeleteNonExisting(done) {
  //   request(api)
  //     .post('/transcription/delete/1')
  //     .expect(200, done);
  // });
});