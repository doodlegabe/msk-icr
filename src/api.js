require('dotenv').config('../.env');
import express from 'express'
import bodyParser from 'body-parser';
import routes from './routes/index';
import favicon from 'serve-favicon';
let multer = require('multer');
let upload = multer({ dest: '/tmp'});
/**
 * Set Up
 */
const app = express();
const port = process.env.PORT || 5050;
/**
 * JSON & Parsing
 */
app.use(express.json());
app.use(bodyParser.urlencoded({
  limit: '5mb',
  parameterLimit: 100000,
  extended: false
}));
app.use(bodyParser.json({
  limit: '5mb',
  type: 'application/*+json'
}));
/**
 * Static
 */
app.use(express.static('public'));
app.use(favicon('src/assets/favicons/favicon.ico'));
/**
 * CORS
 */
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});
/**
 * Images
 */
app.get('/image/:id', routes.image.getImage);
app.post('/image/create', routes.image.createImage);
app.post('/image/delete/:id', routes.image.deleteImage);
app.post('/image/update/:id', routes.image.updateImage);
//ToDo Consolidate clean up.
app.post('/delete-temp', routes.cleanUp.doClean);

/**
 * Providers
 */
app.get('/providers', routes.provider.getProviders);
app.get('/provider/:id', routes.provider.getProvider);
app.get('/providers/seed', routes.provider.seedProviders);
app.post('/provider/create', routes.provider.createProvider);
app.post('/provider/delete/:id', routes.provider.deleteProvider);
app.post('/provider/update/:id', routes.provider.updateProvider);
app.post('/providers/trash', routes.provider.trashProviders);


/**
 * Transcriptions
 */
app.post('/transcribe', upload.array('imageFile'), routes.transcribe.doTranscribe);
app.get('/transcription/:id', routes.transcription.getTranscription);
app.post('/transcription/create', routes.transcription.createTranscription);
app.post('/transcription/delete/:id', routes.transcription.deleteTranscription);
app.post('/transcription/update/:id', routes.transcription.updateTranscription);

/**
 * Users
 */
app.get('/user/:id', routes.user.getUser);
app.post('/user/create', routes.user.createUser);
app.post('/user/delete/:id', routes.user.deleteUser);
app.post('/user/update/:id', routes.user.updateUser);
/**
 * Start
 */
if(!module.parent){
  app.listen(port, ()=>{
    console.log('listening on ' + port);
  });
}
module.exports = app;

