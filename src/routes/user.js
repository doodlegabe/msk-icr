import dbConnect from '../db-connect';
import User from '../db-interface/user';
import writeResponse from '../db-interface/db-interface-helpers/response-helper';
import _ from 'lodash';

exports.getUser = function (req, res, next) {
  const id  = _.get(req.body,'id');
  User.getUser(dbConnect.getSession(req), id)
    .then(response => writeResponse(res, response, 201))
    .catch(next)
};

exports.createUser = function (req, res, next) {
  User.createUser(dbConnect.getSession(req))
    .then(response => writeResponse(res, response, 201))
    .catch(next)
};

exports.deleteUser = function (req, res, next) {
  const id  = _.get(req.body,'id');
  User.deleteUser(dbConnect.getSession(req), id)
    .then(response => writeResponse(res, response, 201))
    .catch(next)
};

exports.updateUser = function (req, res, next) {
  const id  = _.get(req.body,'id');
  User.updateUser(dbConnect.getSession(req), id)
    .then(response => writeResponse(res, response, 201))
    .catch(next)
};