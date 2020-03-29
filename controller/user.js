const userController = require('express');
const md5 = require('md5');
const userModel = require("../model/user");
// list action
userController.reg = function(req, res){
    if(!req.session.user)
        res.render("reg");
    else
        res.redirect("/home");
};
userController.regPost = function(req, res){
    let userName = req.body.userName;
    let userEmail = req.body.userEmail;
    let userPass = md5(req.body.userPass);
    userModel.checkNameAndEmail(userName, userEmail).then(function(data){
        if(data[0].length == 0){
            userModel.create(userName, userEmail, userPass);
            res.render("reg", {success: `Đăng ký thành công [${userEmail}]`});
        } else {
            res.render("reg", {error: `[${userName}] hoặc [${userEmail}] đã được sử dụng, vui lòng thử lại`});
        }
    });
}
// login
userController.login = function(req, res){
    if(!req.session.user)
        res.render("login");
    else
        res.redirect("/home");
};
userController.loginPost = function(req, res){
    userModel.getByEmailAndPass(req.body.userEmail, md5(req.body.userPass)).then(function(data){
        if(data[0].length != 0){
            delete data[0][0]["user_pass"];
            req.session.user = data[0][0];
            req.session.save();
            res.redirect("/home");
        } else {
            res.render("login", {error: "Sai email hoặc mật khẩu, vui lòng thử lại sau "});
        }
    });
}
// logout
userController.logout = function(req, res){
    req.session.destroy();
    res.redirect("/home");
}
module.exports = userController;