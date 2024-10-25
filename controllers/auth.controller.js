const router = require('express').Router();
const authService = require('../services/auth.service');

//To create a token
router.post('/api/user/', authService.register);
router.get('/api/user/', authService.login);


module.exports = router;