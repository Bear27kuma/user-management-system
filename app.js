require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');

const app = express();
app.use(express.json());

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_ROOT_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true
});

pool.getConnection((err, connection) => {
  if (err) throw err;
  console.log(`Connection ID is ${connection.threadId}`);
});

app.get('/test', async (req, res) => {
  res.send({message: 'Your testing node.js and mysql application.'});
});

app.listen(process.env.NODE_DOCKER_PORT, () => {
  console.log(`Application running on port ${process.env.NODE_DOCKER_PORT}`);
});
