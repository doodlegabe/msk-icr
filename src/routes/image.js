import dbConnect from '../db-connect';
import Images from '../db-interface/image';
import _ from 'lodash';
const writeResponse = require('../db-interface/db-interface-helpers/response-helper').writeResponse;
const writeError = require('../db-interface/db-interface-helpers/response-helper').writeError;

exports.getImage = function (req, res, next) {
  const id  = _.get(req.body,'id');
  Images.getImage(dbConnect.getSession(req), id)
    .then(function(response){
      if(response.err){
        writeError(res, response.err, 500)
      }else{
        writeResponse(res, response, 201)
      }
    })
    .catch(next)
};

exports.createImage = function (req, res, next) {
  const uri  = _.get(req.body,'uri');
  Images.createImage(dbConnect.getSession(req), uri)
    .then(function(response){
      if(response.err){
        writeError(res, response.err, 500)
      }else{
        writeResponse(res, response, 201)
      }
    })
    .catch(next)
};

exports.deleteImage = function (req, res, next) {
  const id  = _.get(req.body,'id');
  Images.deleteImage(dbConnect.getSession(req), id)
    .then(function(response){
      if(response.err){
        writeError(res, response.err, 500)
      }else{
        writeResponse(res, response, 201)
      }
    })
    .catch(next)
};

exports.updateImage = function (req, res, next) {
  const id  = _.get(req.body,'id');
  const uri  = _.get(req.body,'uri');
  Images.updateImage(dbConnect.getSession(req), id, uri)
    .then(function(response){
      if(response.err){
        writeError(res, response.err, 500)
      }else{
        writeResponse(res, response, 201)
      }
    })
    .catch(next)
};