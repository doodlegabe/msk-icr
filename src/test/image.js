import request from 'supertest'
import api from '../api'
import Image from '../models/image';
import dbConnect from '../db-connect';

describe('Creating, Reading, Updating, and Deleting Images', function () {
  // it('creates an image from a valid post', function testCreateValid(done) {
  //   request(api)
  //     .post('/image/create')
  //     .expect(200, done);
  // });
  // it('does not create an image from an invalid post', function testCreateInvalid(done) {
  //   request(api)
  //     .post('/image/create')
  //     .expect(200, done);
  // });
  // it('retrieves an existing image', function testRetrieveExisting(done) {
  //   request(api)
  //     .get('/image/1')
  //     .expect(200, done);
  // });
  // it('fails to retrieve a non-existing image', function testRetrieveNonExisting(done) {
  //   request(api)
  //     .get('/image/1')
  //     .expect(200, done);
  // });
  // it('it updates an existing image with a valid post', function testUpdateExistingValid(done) {
  //   request(api)
  //     .post('/image/update/1')
  //     .expect(200, done);
  // });
  // it('it fails to update an existing image with an invalid post', function testUpdateExistingInvalid(done) {
  //   request(api)
  //     .post('/image/update/1')
  //     .expect(200, done);
  // });
  // it('it deletes an existing image', function testDeleteExisting(done) {
  //   request(api)
  //     .post('/image/delete/1')
  //     .expect(200, done);
  // });
  // it('it fails to delete a non-existing image', function testDeleteNonExisting(done) {
  //   request(api)
  //     .post('/image/delete/1')
  //     .expect(200, done);
  // });
});