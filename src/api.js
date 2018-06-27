require('dotenv').config('../.env');
import express from 'express'
import bodyParser from 'body-parser';
import routes from './routes/index';
import favicon from 'serve-favicon';
import dbConnect from './db-connect';

const app = express();
const port = process.env.PORT || 5050;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(favicon('src/assets/favicons/favicon.ico'));
//
// let session = dbConnect.session();
// session
//   .run("CREATE (n {hello: 'Whirl'}) RETURN n.name")
//   .then(function(result) {
//     result.records.forEach(function(record) {
//       console.log(record)
//     });
//
//     session.close();
//   })
//   .catch(function(error) {
//     console.log(error);
//   });
//

/**
 * Routes
 */
app.get('/providers', routes.provider.getProviders);
app.post('/transcribe', routes.transcribe.doTranscribe);


if(!module.parent){
  app.listen(port, ()=>{
    console.log('listening on ' + port);
  });
}
module.exports = app;

