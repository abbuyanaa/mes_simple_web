const express = require('express');
const { parse } = require('url');
const next = require('next');
const path = require('path');

require('dotenv').config({ path: path.join(__dirname, '.env') });

const dev = process.env.NODE_ENV !== 'production';

const app = next({ dev });
const handle = app.getRequestHandler();

const { AXIOS_BASE_HOST_PORT, SERVER_PROTOCOL, HTTP_SERVER_PORT, HTTPS_SERVER_PORT } = require('./config')[process.env.NODE_ENV || 'development'];

console.log('---------------App Starting---------------');
console.log(`NODE_ENV : ${process.env.NODE_ENV || 'development'}`);
console.log(`AXIOS_BASE_HOST_PORT : ${AXIOS_BASE_HOST_PORT}`);
app.prepare().then(() => {
  const httpApp = express();
  const usingApp = SERVER_PROTOCOL === 'https' ? express() : httpApp;

  usingApp.all('*', (req, res) => {
    const parsedUrl = parse(req.url, true);
    // enabled next app
    handle(req, res, parsedUrl);
  });
  
  if (SERVER_PROTOCOL === 'https') {
    // http redirect
    httpApp.all('*', (req, res, next) => {
      const protocol = req.headers['x-forwarded-proto'] || req.protocol;
      if (protocol === 'https') {
        next();
      } else {
        const from = `${protocol}://${req.hostname}:${HTTP_SERVER_PORT}${req.url}`;
        const to = `https://${req.hostname}:${HTTPS_SERVER_PORT}${req.url}`;
        // log and redirect
        console.log(`REDIRECT - [${req.method}]: ${from} -> ${to}`);
        res.redirect(to);
      }
    });
    const { readFileSync } = require('fs');
    const httpsOptions = {};
    try {
      httpsOptions.key = readFileSync(path.join(__dirname, './private.pem'));
      httpsOptions.cert = readFileSync(path.join(__dirname, './public.pem'));
    } catch (error) {
      console.log('인증키가 없습니다.');
      process.exit(-1);
    }
    require('https').createServer(httpsOptions, usingApp).listen(HTTPS_SERVER_PORT, (err) => {
      if (err) throw err;
      console.log(`Https Server Running at : https://localhost:${HTTPS_SERVER_PORT}`);
    });
  }
  require('http').createServer(httpApp).listen(HTTP_SERVER_PORT, (err) => {
    if (err) throw err;
    console.log(`Server running at : http://localhost:${HTTP_SERVER_PORT}`);
  })
});
