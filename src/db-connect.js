require('dotenv').config('../.env');
import neo4j from 'neo4j-driver';

const dbConnect = neo4j.driver(process.env.GRAPHENEDB_BOLT_URL, neo4j.auth.basic(process.env.GRAPHENEDB_BOLT_USER, process.env.GRAPHENEDB_BOLT_PASSWORD));

const getSession = function (context) {
  if(context.neo4jSession) {
    return context.neo4jSession;
  }
  else {
    context.neo4jSession = dbConnect.session();
    return context.neo4jSession;
  }
};

module.exports = {
  dbConnect:dbConnect,
  getSession: getSession
};
