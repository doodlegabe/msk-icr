'use strict';

import fs from 'fs'

exports.doClean = function (req, res) {
  let fileToDelete = req.body.filePath;
  console.log('------');
  console.log(fileToDelete);

  fs.unlink(fileToDelete, (err) => {
    if (err) {
      res.status(500).send({error: err});
    } else {
      res.status(201).send({success: true});
    }
  })
};
