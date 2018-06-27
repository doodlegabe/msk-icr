import dbConnect from '../db-connect';
import Image from '../db-interface/image';
import writeResponse from '../db-interface/db-interface-helpers/response-helper';
import _ from 'lodash';

exports.getImage = function (req, res, next) {
  const id  = _.get(req.body,'id');
  Image.getImage(dbConnect.getSession(req), id)
    .then(response => writeResponse(res, response, 201))
    .catch(next)
};

exports.createImage = function (req, res, next) {
  const uri  = _.get(req.body,'uri');
  Image.createImage(dbConnect.getSession(req), uri)
    .then(response => writeResponse(res, response, 201))
    .catch(next)
};

exports.deleteImage = function (req, res, next) {
  const id  = _.get(req.body,'id');
  Image.deleteImage(dbConnect.getSession(req), id)
    .then(response => writeResponse(res, response, 201))
    .catch(next)
};

exports.updateImage = function (req, res, next) {
  const id  = _.get(req.body,'id');
  const uri  = _.get(req.body,'uri');
  Image.updateImage(dbConnect.getSession(req), id, uri)
    .then(response => writeResponse(res, response, 201))
    .catch(next)
};