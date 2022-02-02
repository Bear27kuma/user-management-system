const express = require('express');
const mysql = require('mysql2');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');

require('dotenv').config();

const app = express();
const port = process.env.NODE_LOCAL_PORT || 3000;

// Parsing middleware
// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Parse application/json
app.use(bodyParser.json());

// Static Files
app.use(express.static('public'));

// Templating Engine
app.engine('hbs', exphbs({ extname: '.hbs' }));
app.set('view engine', 'hbs');

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_ROOT_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
});

pool.getConnection((err, connection) => {
  if (err) throw err;
  // eslint-disable-next-line no-console
  console.log(`Connection ID is ${connection.threadId}`);
});

app.get('/test', async (req, res) => {
  res.send({ message: 'Your testing node.js and mysql application.' });
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Application running on port ${process.env.NODE_DOCKER_PORT}`);
});
