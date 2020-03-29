const indexController = require('express');
// list action
indexController.index = function(req, res){
    res.render('index', {name: "Nguyen Kim Long"});
};
module.exports = indexController;