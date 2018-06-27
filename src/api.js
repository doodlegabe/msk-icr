require('dotenv').config('../.env');
import express from 'express'
import bodyParser from 'body-parser';
import routes from './routes/index';
import favicon from 'serve-favicon';

const app = express();
const port = process.env.PORT || 5050;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(favicon('src/assets/favicons/favicon.ico'));

/**
 * Initial Routes
 */
app.get('/providers', routes.provider.getProviders);
app.post('/transcribe', routes.transcribe.doTranscribe);

/**
 * Images
 */
app.get('/image/:id', routes.image.getImage);
app.post('/image/create', routes.image.createImage);
app.post('/image/delete/:id', routes.image.deleteImage);
app.post('/image/update/:id', routes.image.updateImage);

/**
 * Transcriptions
 */
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


if(!module.parent){
  app.listen(port, ()=>{
    console.log('listening on ' + port);
  });
}
module.exports = app;

