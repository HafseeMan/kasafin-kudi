var router = require('express').Router();

const incomeController = require('../controllers/incomeEntry');

const { newEntry, allIncome } = incomeController;

// new entry
router.post('/add', newEntry);

router.get('/', allIncome);

module.exports = router;
