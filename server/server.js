const path = require('path');
const express = require('express');
const createLocaleMiddleware = require('express-locale');

require('dotenv').config({ path: path.join(__dirname, '.env') });

console.log('---------------Server Starting---------------');
console.log(`>> NODE_ENV : ${process.env.NODE_ENV || 'development'}`);
const pool = require('./db/pool');

pool.getConnection().then(async (conn) => {
  if (conn) {
    try {
      const [result] = await conn.execute('select now() as sysdate');
      console.log(result[0].sysdate);
      console.log('>> Database config');
      console.log(`-- connectString : ${conn.config.host}`);
      console.log(`-- user : ${conn.config.user}`);

      const app = express();
      app.use(express.urlencoded({ extended: true }));
      app.use(express.json());
      app.use(createLocaleMiddleware({
        priority: ['accept-language', 'default'],
        default: 'ko-KR',
      }));

      const user = require('./routes/user');
      const basic = require('./routes/basic');
      app.use('/user', user);
      app.use('/basic', basic);

      let server;
      if (process.env.SERVER_PROTOCOL === 'https') {
        const { readFileSync } = require('fs');
        const httpsOptions = {};
        try {
          httpsOptions.key = readFileSync(path.join(__dirname, './private.pem'));
          httpsOptions.cert = readFileSync(path.join(__dirname, './public.pem'));
        } catch (error) {
          console.log(error.message);
          process.exit(-1);
        }
        server = require('https').createServer(httpsOptions, app);
      } else {
        server = require('http').createServer(app);
      }
      server.listen(process.env.SERVER_PORT, () => {
        console.log(`${process.env.SERVER_PROTOCOL.toUpperCase()} Server Running at ${process.env.SERVER_PROTOCOL}://localhost:${process.env.SERVER_PORT}`);
      });
    } catch (err) {
      console.log('Database Execute & Close Error');
      console.log(err.message);
      process.exit(-1);
    }
  }
})
.catch((err) => {
  console.error('Database Connection Error');
  console.error(err);
});
