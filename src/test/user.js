import request from 'supertest'
import api from '../api'
import User from '../models/user';
import dbConnect from '../db-connect';

describe('Creating, Reading, Updating, and Deleting Users', function () {
  // it('creates a user from a valid post', function testCreateValid(done) {
  //   request(api)
  //     .post('/user/create')
  //     .expect(200, done);
  // });
  // it('does not create an user from an invalid post', function testCreateInvalid(done) {
  //   request(api)
  //     .post('/user/create')
  //     .expect(200, done);
  // });
  // it('retrieves an existing user', function testRetrieveExisting(done) {
  //   request(api)
  //     .get('/user/1')
  //     .expect(200, done);
  // });
  // it('fails to retrieve a non-existing user', function testRetrieveNonExisting(done) {
  //   request(api)
  //     .get('/user/1')
  //     .expect(200, done);
  // });
  // it('it updates an existing user with a valid post', function testUpdateExistingValid(done) {
  //   request(api)
  //     .post('/user/update/1')
  //     .expect(200, done);
  // });
  // it('it fails to update an existing user with an invalid post', function testUpdateExistingInvalid(done) {
  //   request(api)
  //     .post('/user/update/1')
  //     .expect(200, done);
  // });
  // it('it deletes an existing user', function testDeleteExisting(done) {
  //   request(api)
  //     .post('/user/delete/1')
  //     .expect(200, done);
  // });
  // it('it fails to delete a non-existing user', function testDeleteNonExisting(done) {
  //   request(api)
  //     .post('/user/delete/1')
  //     .expect(200, done);
  // });
});