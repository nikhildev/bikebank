const mysql = require('mysql');
let pool;

const dbConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
};

function getPool() {
  if (pool) {
    return pool;
  } else {
    pool = new mysql.createPool(dbConfig);

    pool.on('acquire', (connection) => {
      console.log(`Connection ${connection.threadId} acquired`);
    });

    pool.on('acquire', (connection) => {
      console.log(`Connection ${connection.threadId} released`);
    });
    return pool;
  }
}

module.exports = {
  getPool,
}