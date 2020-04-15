const express = require('express');
const router = express.Router();
const multer  = require('multer');
// SET STORAGE
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  })
   
  var upload = multer({ storage: storage })
// require controller
var user_controller = require('../controller/user');
// declare router
router.get('/reg', user_controller.reg);
router.post('/reg', user_controller.regPost);
router.get('/login', user_controller.login);
router.post('/login', user_controller.loginPost);
router.get('/logout', user_controller.logout);
router.get('/profile/:userName', user_controller.showProfile);
router.post('/add-friend', user_controller.addFriend);
module.exports = router;