const indexController = require('express');
// list action
indexController.index = function(req, res){
    res.render('index');
};
module.exports = indexController;