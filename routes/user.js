const express = require('express');
const router = express.Router();
// require controller
var user_controller = require('../controller/user');
// declare router
router.get('/reg', user_controller.reg);
router.post('/reg', user_controller.regPost);
router.get('/login', user_controller.login);
router.post('/login', user_controller.loginPost);
router.get('/logout', user_controller.logout);
module.exports = router;