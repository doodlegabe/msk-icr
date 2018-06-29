'use strict';

require('dotenv').config('../../.env');
import fs from 'fs'

exports.doClean = function (req, res) {
  let fileToDelete = req.body.filePath;

  fs.unlink(fileToDelete, (err) => {
    if (err) {
      res.status(500).send({error: err});
    } else {
      res.status(201).send({success: true});
    }
  })
};
