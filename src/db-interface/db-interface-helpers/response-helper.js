const _ = require('lodash');

exports.writeResponse = function writeResponse(res, response, status) {
  res.status(status || 200).send(JSON.stringify(response));
};

exports.writeError = function writeError(res, error, status) {
  console.log('called', error, status);
  res.status(error.status || status || 400).send(error);
};