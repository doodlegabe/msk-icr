import uuid from 'uuid';
import _ from 'lodash';
import Provider from '../models/provider';

const getProvider = function (session, id) {
  return session.run('MATCH (p:Provider {id:{id}}) RETURN p', {id: id})
    .then(result => {
      return new Provider(result.records[0].get('p'));
    })
};

const getProviders = function(session){
  return session.run('MATCH (p:Provider) RETURN p')
    .then(results => {
      const providers = [];
      for(let i=0; i<results.records.length; i++){
        let aProvider = new Provider(results.records[i].get('p'));
        providers.push(aProvider);
      }
      return providers;
    })
};

const createProvider = function (session, apiId, name, description, documentation, active) {
  const providerId = uuid.v4();
  return session.run('MATCH (p:Provider {apiId:{apiId}}) RETURN p', {apiId: apiId})
    .then(results => {
      if (!_.isEmpty(results.records)) {
        return {err: 'Provider named ' + apiId + ' is already in use', status: 500}
      } else {
        return session.run('CREATE (p:Provider ' +
          '{id:{id},' +
          ' apiId:{apiId}' +
          ' name:{name}' +
          ' description:{description}' +
          ' documentation:{documentation}' +
          ' active:{active}' +
          '}) RETURN p',
          {
            id: providerId,
            apiId: apiId,
            name:name,
            description: description,
            documentation: documentation,
            active:active
          })
          .then(result => {
            return new Provider(result.records[0].get('p'));
          })
      }
    })
};

const deleteProvider = function (session, id) {
  return session.run('MATCH (p:Provider {id:{id}}) DELETE p', {id: id})
    .then(result => {
      if(result){
        return {success: true, status: 200, message: 'Provider Deleted'}
      }
    })
};

const updateProvider = function (session, id, apiId) {
  return session.run('MATCH (p:Provider {id:{id}}) SET p.apiId = {apiId} RETURN p', {id: id, apiId:apiId})
    .then(result => {
      return new Image(result.records[0].get('p'));
    })
};

const seedProviders = function(session, providerSeedData){
  for(let i=0; i< providerSeedData.length; i++){
    providerSeedData[i].id = uuid.v4();
  }
  return session.run('MATCH (p:Provider) RETURN p')
    .then(results => {
    if (!_.isEmpty(results.records)) {
      return {err: 'Providers already seeded. Use providers/trash, then try again.', status: 500}
    } else {
      return session.run('UNWIND {providerSeedData} AS map CREATE (p:Provider) SET p=map', { providerSeedData:providerSeedData })
        .then(results => {
          return {success: true, status: 200, message: 'Content Seeded', providers: results}
        })
    }
  });
};

const trashProviders = function (session) {
  return session.run('MATCH (p:Provider) DELETE p')
    .then(result => {
      if(result){
        return {success: true, status: 200, message: 'Providers Deleted'}
      }
    })
};


module.exports = {
  getProvider: getProvider,
  getProviders: getProviders,
  createProvider: createProvider,
  deleteProvider: deleteProvider,
  updateProvider: updateProvider,
  seedProviders: seedProviders,
  trashProviders: trashProviders
};