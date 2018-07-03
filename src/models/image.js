import _ from 'lodash';

function Image(_node){
  _.extend(this, {
    'id': _node.properties['id'],
    'uri': _node.properties['uri']
  });
}

export default Image;