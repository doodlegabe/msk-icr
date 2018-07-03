import _ from 'lodash';

function Provider(_node){
  _.extend(this, {
    'id': _node.properties['id'],
    'apiId': _node.properties['apiId'],
    'name': _node.properties['name'],
    'description': _node.properties['description'],
    'documentation': _node.properties['documentation'],
    'active': _node.properties['active']
  });}

export default Provider;