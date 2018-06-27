'use strict';

import providerData from '../seed-content/providers'

exports.getProviders = function (req, res) {
  res.send(providerData)
};

