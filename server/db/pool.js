const mysql = require('mysql2');
const config = require('../config')[process.env.NODE_ENV || 'development'];

const pool = mysql.createPool(config).promise();

// exit process & close Pool
const closePoolandExit = async () => {
  console.log('Pool closing');
  try {
    await pool.destroy();
    console.log('Pool closed');
    process.exit(0);
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};

process.once('SIGTERM', async () => {
  console.log('SIGTERM');
  await closePoolandExit();
});

process.once('SIGINT', async () => {
  console.log('SIGINT'); // Ctrl+C
  await closePoolandExit();
});

process.once('uncaughtException', async (err) => {
  console.log('uncaughtException', err);
  await closePoolandExit();
});

module.exports = pool;
