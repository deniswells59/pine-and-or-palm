require('dotenv').config();

import fs from 'fs';
import express, { Router } from 'express';
import http from 'http';
import https from 'https';
import path from 'path';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';

import MerchController from './controllers/merch';
import CartController from './controllers/cart';
import CheckoutController from './controllers/checkout';

const webpack = require('webpack');
const webpackConfig = require('../webpack.config');
const compiler = webpack(webpackConfig);

const app = express();
const apiRouter = express.Router();
const PORT = process.env.NODE_ENV === 'prod' ? 80 : 3000;
const server = http.createServer(app);

const routes = [
  '/',
];

const MONGOURL = process.env.MONGODB_URI || 'mongodb://localhost/pineandorpalm';
mongoose.Promise = Promise;
mongoose.connect(MONGOURL, {
  useMongoClient: true
})
  .then(() => {
    console.log(`Mongo connected!`);
  })

app.use(require("webpack-dev-middleware")(compiler, {
  noInfo: true, publicPath: webpackConfig.output.publicPath
}));
app.use(require("webpack-hot-middleware")(compiler, {
 'log': false,
 'path': '/__webpack_hmr',
 'heartbeat': 10 * 1000
}));

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

app.use('/api', apiRouter);

// const mc =  new MerchController(apiRouter);
// const cc =  new CartController(apiRouter);
// const chc = new CheckoutController(apiRouter);

app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'))
});

if(process.env.NODE_ENV === 'prod') {
  const options = {
    key  : fs.readFileSync(path.join(__dirname, '..', 'pineandorpalm.com.key')),
    cert : fs.readFileSync(path.join(__dirname, '..', 'pineandorpalm_com.crt'))
  };

  https.createServer(options, app).listen(443, function () {
    console.log('Started!');
  });
}


server.listen(PORT, err => {
  console.log(err || `Listening on port ${PORT}`);
});
