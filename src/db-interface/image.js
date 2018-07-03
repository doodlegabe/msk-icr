import uuid from 'uuid';
import _ from 'lodash';
import Image from '../models/image';

const getImage = function (session, id) {
  return session.run('MATCH (i:Image {id:{id}}) RETURN i', {id: id})
    .then(result => {
      return new Image(result.records[0].get('i'));
    })
};

const createImage = function (session, uri) {
  const imageId = uuid.v4();
  return session.run('MATCH (i:Image {uri:{uri}}) RETURN i', {uri: uri})
    .then(results => {
      if (!_.isEmpty(results.records)) {
        return {err: 'Image at ' + uri + ' is already in use', status: 500}
      } else {
        return session.run('CREATE (i:Image {id:{id}, uri:{uri}}) RETURN i', {id: imageId, uri: uri})
          .then(result => {
            return new Image(result.records[0].get('i'));
          })
      }
    })
};

const deleteImage = function (session, id) {
  return session.run('MATCH (i:Image {id:{id}}) DELETE i', {id: id})
    .then(result => {
      if(result){
        return true;
      }
    })
};

const updateImage = function (session, id, uri) {
  return session.run('MATCH (i:Image {id:{id}}) SET i.uri = {uri} RETURN i', {id: id, uri:uri})
    .then(result => {
      return new Image(result.records[0].get('i'));
    })
};


module.exports = {
  getImage: getImage,
  createImage: createImage,
  deleteImage: deleteImage,
  updateImage: updateImage
};