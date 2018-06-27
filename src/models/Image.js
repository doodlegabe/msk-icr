import _ from 'lodash';

function Image(_node){
  _.extend(this, _node.properties);
}

module.exports = Image;