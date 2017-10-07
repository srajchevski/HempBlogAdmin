const path = require('path');
const http = require('http');
const express = require('express');
//const logger = require('./utils/logger');
//const config = require('./config/environments/config');
const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 8000 : process.env.PORT;
const app = express();


app.use('/', express.static(path.join(process.cwd(), 'public')));

app.use('/*', function (req, res) {
  res.sendFile(path.join(process.cwd() + '/public/index.html'));
});

var server = http.createServer();

// Attach express to our httpServer
server.on('request', app);

server.listen(3000, function onStart(err) {
  if (err) {
    //logger.error(err);
  }
  else {
    //logger.info(`Server has started on port : ${port}`);
  }
});
