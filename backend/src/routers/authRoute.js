var router = require('express').Router();

const authController = require('../controllers/Auth');

const { signUp, signIn } = authController;

// sign up
router.post('/signup', signUp);

// sign in
router.post('/login', signIn);

module.exports = router;
