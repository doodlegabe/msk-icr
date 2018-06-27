import _ from 'lodash';

function Transcription(_node){
  _.extend(this, _node.properties);
}

module.exports = Transcription;