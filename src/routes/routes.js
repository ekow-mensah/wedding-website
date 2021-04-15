const router = require('express').Router();
const apiController = require('../controllers/api.controller');

router.get('/api/v1/', apiController.indexAction);
router.post('/api/v1/rsvp', apiController.saveGuest)

module.exports = router;