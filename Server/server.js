const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const webpack = require('webpack');
const webpackConfig = require('../webpackConfig.js');
const webpackDevMiddleware = require('webpack-dev-middleware');
const port = process.env.PORT || 8008;
const handlers = require('./handlers');

const db = require('../Database/handler');

const app = express();

const compiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(compiler, {
  publicPath: '/',
  stats: {
    // Config for minimal console.log mess.
    assets: false,
    colors: true,
    version: false,
    hash: false,
    timings: false,
    chunks: false,
    chunkModules: false,
  },
}));

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../dist')));

//api routes

app.post('/getZillowHistoricalData', handlers.getZillowHistoricalData);
app.post('/getZillowPropertyData', handlers.getZillowPropertyData);

app.post('/getMonthlyLoanPaymentDetails', handlers.getMonthlyLoanPaymentDetails);
app.get('/getPriceAppreciation', handlers.getPriceAppreciation);

app.get('/getPropertyList', handlers.getProperties);

app.post('/db/addUser', db.addUser);

app.listen(port, () => {
  console.log('app is listening on 8008');
})
