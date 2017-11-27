// All Mongo DB code has been commented out.
// This was a work in progress when the client wanted
// to sell merchandise from the website, but soon
// found out they would not have enough items to make a
// store worth it.

require('dotenv').config();

import fs           from 'fs';
import http         from 'http';
import https        from 'https';
import path         from 'path';
import morgan       from 'morgan';
import bodyParser   from 'body-parser';
import cookieParser from 'cookie-parser';
import webpack      from 'webpack';
// import mongoose     from 'mongoose';

import express, { Router } from 'express';

import webpackConfig from '../webpack.prod.js';

// import MerchController from './controllers/merch';
// import CartController from './controllers/cart';
// import CheckoutController from './controllers/checkout';

// const MONGOURL = process.env.MONGODB_URI || 'mongodb://localhost/pineandorpalm';
// mongoose.Promise = Promise;
// mongoose.connect(MONGOURL, {
//   useMongoClient: true
// })
//   .then(() => {
//     console.log(`Mongo connected!`);
//   })

const app      = express();
const api      = express.Router();
const PORT     = process.env.NODE_ENV === 'production' ? 80 : 3000;
const server   = http.createServer(app);
const compiler = webpack(webpackConfig);

if(process.env.NODE_ENV === 'dev') {
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true, publicPath: webpackConfig.output.publicPath
  }));
  app.use(require('webpack-hot-middleware')(compiler, {
    // 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true'
    'log': false,
    'path': '/__webpack_hmr',
    'heartbeat': 10 * 1000
  }));
}

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

app.use('/api', api);

// const mc =  new MerchController(api);
// const cc =  new CartController(api);
// const chc = new CheckoutController(api);

app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'))
});

if(process.env.NODE_ENV === 'production') {

  // SSL stuff, again for ecommerce
  const options = {
    key  : fs.readFileSync(path.join(__dirname, '..', 'pineandorpalm.com.key')),
    cert : fs.readFileSync(path.join(__dirname, '..', 'pineandorpalm_com.crt'))
  };

  https.createServer(options, app).listen(443, function () {
    console.log(err || 'Listening on port 443');
  });
}

server.listen(PORT, err => {
  console.log(err || `Listening on port ${PORT}`);
});
