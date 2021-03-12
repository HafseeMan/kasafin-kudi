// dotenv
require('dotenv').config();

const mysql = require('mysql');
// connection configurations
const connection = mysql.createConnection({
  host: process.env.H_DSN,
  user: process.env.H_USER,
  password: process.env.H_PASSWORD,
  database: process.env.H_DATABASE
});

// connect to database
connection.connect((err, res) => {
  if (err) throw err;

  console.log('Database connected and running!!!');
});

module.exports = connection;
