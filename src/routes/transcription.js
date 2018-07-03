import dbConnect from '../db-connect';
import Transcriptions from '../db-interface/transcription';
import _ from 'lodash';
const writeResponse = require('../db-interface/db-interface-helpers/response-helper').writeResponse;
const writeError = require('../db-interface/db-interface-helpers/response-helper').writeError;

exports.getTranscription = function (req, res, next) {
  const id  = _.get(req.body,'id');
  Transcriptions.getTranscription(dbConnect.getSession(req), id)
    .then(function(response){
      if(response.err){
        writeError(res, response.err, 500)
      }else{
        writeResponse(res, response, 201)
      }
    })
    .catch(next)
};

exports.createTranscription = function (req, res, next) {
  const text  = _.get(req.body,'text');
  const providerId  = _.get(req.body,'providerId');
  const imageId  = _.get(req.body,'imageId');
  Transcriptions.createTranscription(dbConnect.getSession(req), text, providerId, imageId)
    .then(function(response){
      if(response.err){
        writeError(res, response.err, 500)
      }else{
        writeResponse(res, response, 201)
      }
    })
    .catch(next)
};

exports.deleteTranscription = function (req, res, next) {
  const id  = _.get(req.body,'id');
  Transcriptions.deleteTranscription(dbConnect.getSession(req), id)
    .then(function(response){
      if(response.err){
        writeError(res, response.err, 500)
      }else{
        writeResponse(res, response, 201)
      }
    })
    .catch(next)
};

exports.updateTranscription = function (req, res, next) {
  Transcriptions.updateTranscription(dbConnect.getSession(req), id)
    .then(function(response){
      if(response.err){
        writeError(res, response.err, 500)
      }else{
        writeResponse(res, response, 201)
      }
    })
    .catch(next)
};