import dbConnect from '../db-connect';
import Transcriptions from '../db-interface/transcription';
const writeResponse = require('../db-interface/db-interface-helpers/response-helper').writeResponse;
const writeError = require('../db-interface/db-interface-helpers/response-helper').writeError;

exports.getTranscription = function (req, res, next) {
  const id  = req.params.id;
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
  const text  = req.params.text;
  const providerId  = req.params.providerId;
  const imageId  = req.params.imageId;
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
  const id  = req.params.id;
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
  const id  = req.params.id;
  const text  = req.params.text;
  Transcriptions.updateTranscription(dbConnect.getSession(req), id, text)
    .then(function(response){
      if(response.err){
        writeError(res, response.err, 500)
      }else{
        writeResponse(res, response, 201)
      }
    })
    .catch(next)
};