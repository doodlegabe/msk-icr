import uuid from 'uuid';
import User from '../models/User';

const getUser = function (session, id) {
  return session.run('MATCH (u:User {id:{id}}) RETURN u', {id: id})
    .then(result => {
      return new User(result.records[0].get('u'));
    })
};

const createUser = function (session) {
  const id = uuid.v4();
  return session.run('CREATE (u:User {id:{id}}) RETURN u', {id: id})
    .then(result => {
      return new User(result.records[0].get('u'));
    })
};

const deleteUser = function (session, id) {
  return session.run('MATCH (u:User {id:{id}}) DELETE u', {id: id})
    .then(result => {
      if(result){
        return true;
      }
    })
};

const updateUser = function (session, id) {
  return session.run('MATCH (u:User {id:{id}}) RETURN u', {id: id})
    .then(result => {
      return new User(result.records[0].get('u'));
    })
};


module.exprts = {
  getUser: getUser,
  createUser: createUser,
  deleteUser: deleteUser,
  updateUser: updateUser
};