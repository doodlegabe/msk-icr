import uuid from 'uuid';
import Transcription from '../models/transcription';

const getTranscription = function (session, id) {
  return session.run('MATCH (t:Transcription {id:{id}}) RETURN t', {id: id})
    .then(result => {
      return new Transcription(result.records[0].get('t'));
    })
};

const createTranscription = function (session) {
  const id = uuid.v4();
  return session.run('CREATE (t:Transcription {id:{id}}) RETURN t', {id: id})
    .then(result => {
      return new Transcription(result.records[0].get('t'));
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


module.exprts = {
  getTranscription: getTranscription,
  createTranscription: createTranscription,
  deleteTranscription: deleteTranscription,
  updateTranscription: updateTranscription
};