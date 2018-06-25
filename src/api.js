require('dotenv').config('../.env');
import express from 'express'
import bodyParser from 'body-parser';
import routes from './routes/index';
const PORT = process.env.API_PORT;
const HOST = process.env.API_HOST;

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

/**
 * Routes
 */
app.get('/providers', routes.provider.getProviders);
app.listen(PORT, () => {
  console.log('running on ' + HOST + ':' + PORT);
});


