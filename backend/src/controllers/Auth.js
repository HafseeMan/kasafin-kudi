const connection = require('../models/dbase');
const bcrypt = require('bcrypt');
exports.signUp = (req, res) => {
  // sql query
  const sql_search = 'SELECT * FROM users WHERE email = ?';
  const sql_insert = 'INSERT INTO users (first_name, last_name, email, password) VAlUES (?,?,?,?)';

  // request
  const user = req.body;

  connection.query(sql_search, [user.email], (err, result) => {
    if (err) return res.status(500).json({ success: false, message: 'internal server error' });
    if (result.length < 1) {
      bcrypt.hash(user.password, 10, (errHash, hash) => {
        if (errHash) return res.status(500).json({ success: false, message: 'Internal Server Error' });

        connection.query(
          sql_insert,
          [`${user.firstname}`, `${user.lastname}`, `${user.email}`, hash],
          (err, result) => {
            if (err) {
              return res.status(500).json({
                message: 'Internet Server Error',
                status: 500,
                success: false,
                err,
                hash
              });
            } else if (!user) {
              return res.status(400).json({
                message: 'Please fill the form',
                status: 400,
                success: false,
                err
              });
            } else {
              return res
                .status(200)
                .json({ message: 'Login successful', token: process.env.TOKEN_SECRET, success: true });
            }
          }
        );
      });
    } else {
      return res.status(200).json('This account already exists');
    }
  });
};
exports.signIn = async (req, res) => {
  // const
  const sql = 'SELECT * FROM users WHERE email = ?';
  const user = req.body;

  connection.query(sql, [user.email], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: 'Internet Server Error',
        status: 500,
        success: false,
        err
      });
    } else if (result.length < 1 || !result[0].email) {
      return res.status(400).json({
        message: 'Email does not exist',
        status: 400,
        success: false,
        err
      });
    } else {
      const validPass = bcrypt.compare(user.password, result.password);
      if (!validPass) {
        return res.status(400).json({ message: 'Email or Password Incorrect', success: false });
      } else {
        return res.status(201).json({
          message: 'login successful',
          token: process.env.TOKEN_SECRET,
          success: true
        });
      }
    }
  });
};
