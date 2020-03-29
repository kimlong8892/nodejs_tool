const express = require('express');
const router = express.Router();
// require controller
var chatlog_controller = require('../controller/chatlog');
// declare router
router.get('/', chatlog_controller.index);
router.post('/add', chatlog_controller.add);
module.exports = router;