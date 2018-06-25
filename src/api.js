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
 * Routes
 */
app.get('/providers', routes.provider.getProviders);

app.listen(port, () => {
  console.log('listening on ' + port);
});


