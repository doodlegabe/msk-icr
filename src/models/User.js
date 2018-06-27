import _ from 'lodash';

function User(_node){
  _.extend(this, _node.properties);
}

module.exports = User;