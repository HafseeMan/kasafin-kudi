// const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const token = req.token;
  if (!token || token === undefined || token === null) return res.status(401).send('Access denied');
  else if (token !== process.env.TOKEN_SECRET) return res.status(401).send('Access denied. Incorrect Token');
  next();
};
