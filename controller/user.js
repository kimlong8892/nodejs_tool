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
    userReg = new userModel({user_name: userName, user_email: userEmail, user_pass: userPass});
    userReg.save(function (err, userObj) {
        if (err) {
            res.render("reg", {error: err});
        } else {
            res.render("reg", {success: `Đăng ký thành công [${userObj.user_name}]`});
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
    let userEmail = req.body.userEmail;
    let userPass = md5(req.body.userPass);
    let objUserPromise = userModel.findOne({user_email: userEmail, user_pass: userPass}).exec();
    objUserPromise.then(function(data){
        if(data){
            req.session.user = data;
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
// profile
userController.showProfile = function(req, res){
    let userName = req.params.userName;
    userModel.findOne({user_name: userName}).exec().then(function(data){
        if(data){
            let my_profile = data._id == req.session.user._id ? true : false;
            res.render('profile', {my_user: data, my_profile: my_profile});
        } else {
            res.redirect('/home');
        }
    });
};

// add friend
userController.addFriend = function(req, res) {
    let id_friend = req.body.id_friend;
    userModel.findById(req.session.user._id).exec().then(function(data){
        let ids = data.friend_ids;
        ids.push(id_friend);
        userModel.updateOne(
            {
                _id: req.session.user._id
            },
            {
                $set: { "friend_ids" :  ids}
            }
        ).exec();
    });

};
module.exports = userController;