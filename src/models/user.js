import _ from 'lodash';

function User(_node){
  _.extend(this, {
    'id': _node.properties['id']
  });
}

export default User;