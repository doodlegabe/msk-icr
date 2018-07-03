import uuid from 'uuid';
import Transcription from '../models/transcription';

const getTranscription = function (session, id) {
  return session.run('MATCH (t:Transcription {id:{id}}) RETURN t', {id: id})
    .then(result => {
      return new Transcription(result.records[0].get('t'));
    })
};

const createTranscription = function (session, text, providerId, imageId) {
  const id = uuid.v4();
  return session.run('CREATE (t:Transcription {id:{id}, text:{text}}) RETURN t', {id: id, text:text})
    .then(results => {
      const creationResults = results;
      return session.run('MATCH (t:Transcription {id:{id}}) CREATE (image {id:{imageId}})<-[:TRANSCRIBES]-(t) CREATE (provider {id:{providerId}})<-[:TRANSCRIBED_BY]-(t)', {id:id, imageId:imageId, providerId: providerId }
      ).then(() => {
          return new Transcription(creationResults.records[0].get('t'));
        }
      )
    })
};

const deleteTranscription = function (session, id) {
  return session.run('MATCH (t:Transcription {id:{id}}) DELETE t', {id: id})
    .then(result => {
      if(result){
        return true;
      }
    })
};

const updateTranscription = function (session, id) {
  return session.run('MATCH (t:Transcription {id:{id}}) RETURN t', {id: id})
    .then(result => {
      return new Transcription(result.records[0].get('t'));
    })
};


module.exports = {
  getTranscription: getTranscription,
  createTranscription: createTranscription,
  deleteTranscription: deleteTranscription,
  updateTranscription: updateTranscription
};