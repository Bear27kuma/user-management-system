const mysql = require('mysql2');

// Connection Pool
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_ROOT_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
});

// View Users
exports.view = (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    // eslint-disable-next-line no-console
    console.log(`Connected as ID [${connection.threadId}]`);

    // Use the connection
    // eslint-disable-next-line no-shadow
    connection.query('SELECT * FROM users WHERE status = "active"', (err, rows) => {
      // When done with the connection, release it
      connection.release();

      if (!err) {
        res.render('home', { rows });
      } else {
        // eslint-disable-next-line no-console
        console.log(err);
      }
    });
  });
};

// View Users
exports.show = (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    // eslint-disable-next-line no-console
    console.log(`Connected as ID [${connection.threadId}]`);

    // Use the connection
    // eslint-disable-next-line no-shadow
    connection.query('SELECT * FROM users WHERE id = ?', [req.params.id], (err, rows) => {
      // When done with the connection, release it
      connection.release();

      if (!err) {
        res.render('view-user', { rows });
      } else {
        // eslint-disable-next-line no-console
        console.log(err);
      }
    });
  });
};

// Find User by Search
exports.find = (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    // eslint-disable-next-line no-console
    console.log(`Connected as ID [${connection.threadId}]`);

    // Search term
    const searchTerm = req.body.search;

    // Use the connection
    // eslint-disable-next-line no-shadow
    connection.query('SELECT * FROM users WHERE first_name LIKE ? OR last_name LIKE ?', [`%${searchTerm}%`, `%${searchTerm}%`], (err, rows) => {
      // When done with the connection, release it
      connection.release();

      if (!err) {
        res.render('home', { rows });
      } else {
        // eslint-disable-next-line no-console
        console.log(err);
      }
    });
  });
};

// Render User Form
exports.form = (req, res) => {
  res.render('add-user');
};

// Add New User
exports.create = (req, res) => {
  const {
    // eslint-disable-next-line camelcase
    first_name, last_name, email, phone, comment,
  } = req.body;

  pool.getConnection((err, connection) => {
    if (err) throw err;
    // eslint-disable-next-line no-console
    console.log(`Connected as ID [${connection.threadId}]`);

    // Use the connection
    // eslint-disable-next-line no-shadow,camelcase
    connection.query('INSERT INTO users SET first_name = ?, last_name = ?, email = ?, phone = ?, comment = ?', [first_name, last_name, email, phone, comment], (err) => {
      // When done with the connection, release it
      connection.release();

      if (!err) {
        res.render('add-user', { alert: 'User added successfully.' });
      } else {
        // eslint-disable-next-line no-console
        console.log(err);
      }
    });
  });
};

// Render Edit Page
exports.edit = (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    // eslint-disable-next-line no-console
    console.log(`Connected as ID [${connection.threadId}]`);

    // Use the connection
    // eslint-disable-next-line no-shadow
    connection.query('SELECT * FROM users WHERE id = ?', [req.params.id], (err, rows) => {
      // When done with the connection, release it
      connection.release();

      if (!err) {
        res.render('edit-user', { rows });
      } else {
        // eslint-disable-next-line no-console
        console.log(err);
      }
    });
  });
};

// Update User
exports.update = (req, res) => {
  const {
    // eslint-disable-next-line camelcase
    first_name, last_name, email, phone, comment,
  } = req.body;

  pool.getConnection((err, connection) => {
    if (err) throw err;
    // eslint-disable-next-line no-console
    console.log(`Connected as ID [${connection.threadId}]`);

    // Use the connection
    // eslint-disable-next-line no-shadow,camelcase
    connection.query('UPDATE users SET first_name = ?, last_name = ?, email = ?, phone = ?, comment = ? WHERE id = ?', [first_name, last_name, email, phone, comment, req.params.id], (err) => {
      // When done with the connection, release it
      connection.release();

      if (!err) {
        // eslint-disable-next-line no-shadow
        pool.getConnection((err, connection) => {
          if (err) throw err;
          // eslint-disable-next-line no-console
          console.log(`Connected as ID [${connection.threadId}]`);

          // Use the connection
          // eslint-disable-next-line no-shadow
          connection.query('SELECT * FROM users WHERE id = ?', [req.params.id], (err, rows) => {
            // When done with the connection, release it
            connection.release();

            if (!err) {
              // eslint-disable-next-line camelcase
              res.render('edit-user', { rows, alert: `${first_name} has been updated.` });
            } else {
              // eslint-disable-next-line no-console
              console.log(err);
            }
          });
        });
      } else {
        // eslint-disable-next-line no-console
        console.log(err);
      }
    });
  });
};

// Delete a user
exports.delete = (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    // eslint-disable-next-line no-console
    console.log(`Connected as ID [${connection.threadId}]`);

    // Use the connection
    // eslint-disable-next-line no-shadow
    connection.query('UPDATE users SET status = ? WHERE id = ?', ['removed', req.params.id], (err) => {
      // When done with the connection, release it
      connection.release();

      if (!err) {
        res.redirect('/');
      } else {
        // eslint-disable-next-line no-console
        console.log(err);
      }
    });
  });
};
