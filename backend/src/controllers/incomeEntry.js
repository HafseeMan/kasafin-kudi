const connection = require('../models/dbase');

exports.newEntry = (req, res) => {
  const sql = 'INSERT INTO income_tracker_list (name, category, quantity, cost) VALUE (?)';
  const income_data = req.body;
  connection.query(sql, [income_data], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: 'Internet Server Error',
        status: 500,
        success: false,
        err
      });
    } else {
      return res.status(200).json({ message: `Income record added successfully`, result, success: true });
    }
  });
};

exports.allIncome = (req, res) => {
  const sql = 'SELECT * FROM income_tracker_list';

  connection.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({
        message: 'Internet Server Error',
        status: 500,
        success: false,
        err
      });
    } else {
      return res.status(200).json({ result, success: true });
    }
  });
};
