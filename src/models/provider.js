import _ from 'lodash';

function Provider(_node){
  _.extend(this, _node.properties);
}

module.exports = Provider;