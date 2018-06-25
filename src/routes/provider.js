'use strict';

import providerData from '../schema/providers'

exports.getProviders = function (req, res) {
  res.send(providerData)
};

