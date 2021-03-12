// dotenv
require('dotenv').config();

// express
const express = require('express');

// body parser
const bodyParser = require('body-parser');

// cors
const cors = require('cors');

// express app
const app = express();

// parser encoding
app.use(bodyParser.urlencoded({ extended: true }));

// parse app
app.use(bodyParser.json(), cors());

// port
const port = process.env.PORT;

app.listen(port, () => {
  console.log('Server running at http://localhost: ' + port + '\nOpen your browser to view');
});

// ROUTES IMPORT
const AuthRoute = require('./src/routers/authRoute');

const IncomeRoute = require('./src/routers/incomeRoute');

const ExpenseRoute = require('./src/routers/expenseRoute');

// ROUTES USAGE

// auth
app.use('/api/auth', AuthRoute);

// income
app.use('/api/income', IncomeRoute);

// income
app.use('/api/expense', ExpenseRoute);

// test api
app.get('/', (req, res) => {
  res.send('we are up and running');
});
