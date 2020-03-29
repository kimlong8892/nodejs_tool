const chatlogController = require('express');
const chatlogModel = require('../model/chatlog');
// list action
chatlogController.index = function(req, res){
    chatlogModel.getAll().then(function(data){
        res.send(data);
    });
}
chatlogController.add = function(req, res){
    let mess = req.body.mess;
    chatlogModel.add(mess, req.session.user.user_id);
};
module.exports = chatlogController;