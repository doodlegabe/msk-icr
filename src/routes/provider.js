import dbConnect from '../db-connect';
import Providers from '../db-interface/provider';
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
  const id  = req.params.id;
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
  const apiId  = req.params.apiId;
  const name  = req.params.name;
  const description  = req.params.description;
  const documentation  = req.params.documentation;
  const active  = req.params.active;
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
  const id  = req.params.id;
  const apiId  = req.params.apiId;
  const name  = req.params.name;
  const description  = req.params.description;
  const documentation  = req.params.documentation;
  const active  = req.params.active;
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
  const id  = req.params.id;
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
