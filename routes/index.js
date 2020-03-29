const express = require('express');
const router = express.Router();
// require controller
var index_controller = require('../controller/index');
// declare router
router.get('/', index_controller.index);
module.exports = router;