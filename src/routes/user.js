import dbConnect from '../db-connect';
import Users from '../db-interface/user';
const writeResponse = require('../db-interface/db-interface-helpers/response-helper').writeResponse;
const writeError = require('../db-interface/db-interface-helpers/response-helper').writeError;

exports.getUser = function (req, res, next) {
  const id  = req.params.id;
  Users.getUser(dbConnect.getSession(req), id)
    .then(function(response){
      if(response.err){
        writeError(res, response.err, 500)
      }else{
        writeResponse(res, response, 201)
      }
    })
    .catch(next)
};

exports.createUser = function (req, res, next) {
  Users.createUser(dbConnect.getSession(req))
    .then(function(response){
      if(response.err){
        writeError(res, response.err, 500)
      }else{
        writeResponse(res, response, 201)
      }
    })
    .catch(next)
};

exports.deleteUser = function (req, res, next) {
  const id  = req.params.id;
  Users.deleteUser(dbConnect.getSession(req), id)
    .then(function(response){
      if(response.err){
        writeError(res, response.err, 500)
      }else{
        writeResponse(res, response, 201)
      }
    })
    .catch(next)
};

//ToDo Possibly remove
exports.updateUser = function (req, res, next) {
  const id  = req.params.id;
  Users.updateUser(dbConnect.getSession(req), id)
    .then(function(response){
      if(response.err){
        writeError(res, response.err, 500)
      }else{
        writeResponse(res, response, 201)
      }
    })
    .catch(next)
};