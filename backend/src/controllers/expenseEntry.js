const connection = require('../models/dbase');

exports.newEntry = (req, res) => {
  const sql = 'INSERT INTO expence_tracker_list (name, category, quantity) VALUE (?,?,?)';
  const expense_data = req.body;
  connection.query(sql, [expense_data.name, expense_data.category, expense_data.quantity], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: 'Internet Servre Error',
        status: 500,
        success: false,
        err
      });
    } else {
      return res
        .status(200)
        .json({ message: `expense record added successfully`, result, expense_data, success: true });
    }
  });
};

exports.allExpense = (req, res) => {
  const sql = 'SELECT * FROM expence_tracker_list';

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
