import dbConnect from '../db-connect';
import Transcription from '../db-interface/transcription';
import writeResponse from '../db-interface/db-interface-helpers/response-helper';
import _ from 'lodash';

exports.getTranscription = function (req, res, next) {
  const id  = _.get(req.body,'id');
  Transcription.getTranscription(dbConnect.getSession(req), id)
    .then(response => writeResponse(res, response, 201))
    .catch(next)
};

exports.createTranscription = function (req, res, next) {
  Transcription.createTranscription(dbConnect.getSession(req))
    .then(response => writeResponse(res, response, 201))
    .catch(next)
};

exports.deleteTranscription = function (req, res, next) {
  const id  = _.get(req.body,'id');
  Transcription.deleteTranscription(dbConnect.getSession(req), id)
    .then(response => writeResponse(res, response, 201))
    .catch(next)
};

exports.updateTranscription = function (req, res, next) {
  Transcription.updateTranscription(dbConnect.getSession(req), id)
    .then(response => writeResponse(res, response, 201))
    .catch(next)
};