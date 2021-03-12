var router = require('express').Router();

const expenseController = require('../controllers/expenseEntry');

const { newEntry, allExpense } = expenseController;

// new entry
router.post('/add', newEntry);

router.get('/', allExpense);

module.exports = router;
