const router = require('express').Router();
const kvService = require('../services/keyValue.service');
const authService = require('../services/auth.service');

//To create a token
router.post('/api/object/', authService.authorize(), kvService.createKeyValue);
router.get('/api/object/:key', authService.authorize(), kvService.getKeyValue);
router.delete('/api/object/:key', authService.authorize(), kvService.deleteKeyValue);
router.post('/api/batch/object', authService.authorize(), kvService.bulkCreateKeyValue);


module.exports = router;