import dbConnect from '../db-connect';
import Providers from '../db-interface/provider';
import _ from 'lodash';
const writeResponse = require('../db-interface/db-interface-helpers/response-helper').writeResponse;
const writeError = require('../db-interface/db-interface-helpers/response-helper').writeError;
import providerSeedData from '../seed-content/providers'

exports.getProviders = function (req, res, next) {
  Providers.getProviders(dbConnect.getSession(req))
    .then(function(response){
      if(response.err){
        writeError(res, response.err, 500)
      }else{
        writeResponse(res, response, 201)
      }
    })
    .catch(next)
};

exports.getProvider = function (req, res, next) {
  const id  = _.get(req.body,'id');
  Providers.getProvider(dbConnect.getSession(req), id)
    .then(function(response){
      if(response.err){
        writeError(res, response.err, 500)
      }else{
        writeResponse(res, response, 201)
      }
    })
    .catch(next)
};

exports.createProvider = function (req, res, next) {
  const apiId  = _.get(req.body,'apiId');
  const name  = _.get(req.body,'name');
  const description  = _.get(req.body,'description');
  const documentation  = _.get(req.body,'documentation');
  const active  = _.get(req.body,'active');
  Providers.createProvider(dbConnect.getSession(req), apiId, name, description, documentation, active)
    .then(function(response){
      if(response.err){
        writeError(res, response.err, 500)
      }else{
        writeResponse(res, response, 201)
      }
    })
    .catch(next)
};

exports.updateProvider = function (req, res, next) {
  const id  = _.get(req.body,'id');
  const apiId  = _.get(req.body,'apiId');
  const name  = _.get(req.body,'name');
  const description  = _.get(req.body,'description');
  const documentation  = _.get(req.body,'documentation');
  const active  = _.get(req.body,'active');
  Providers.updateProvider(dbConnect.getSession(req), id, apiId, name, description, documentation, active)
    .then(function(response){
      if(response.err){
        writeError(res, response.err, 500)
      }else{
        writeResponse(res, response, 201)
      }
    })
    .catch(next)
};

exports.deleteProvider = function (req, res, next) {
  const id  = _.get(req.body,'id');
  Providers.deleteProvider(dbConnect.getSession(req), id)
    .then(function(response){
      if(response.err){
        writeError(res, response.err, 500)
      }else{
        writeResponse(res, response, 201)
      }
    })
    .catch(next)
};

exports.seedProviders = function (req, res, next) {
  Providers.seedProviders(dbConnect.getSession(req), providerSeedData)
    .then(function(response){
      if(response.err){
        writeError(res, response.err, 500)
      }else{
        writeResponse(res, response, 201)
      }
    })
    .catch(next)
};

exports.trashProviders = function (req, res, next) {
  Providers.trashProviders(dbConnect.getSession(req))
    .then(function(response){
      if(response.err){
        writeError(res, response.err, 500)
      }else{
        writeResponse(res, response, 201)
      }
    })
    .catch(next)
};
