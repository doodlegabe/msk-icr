import _ from 'lodash';

function Transcription(_node){
  _.extend(this, {
    'id': _node.properties['id'],
    'text': _node.properties['text']
  });
}

export default Transcription;