const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = process.env.PORT || 8008;

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../dist')));

app.listen(port, () => {
  console.log('app is listening on 8008');
})