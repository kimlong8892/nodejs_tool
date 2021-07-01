// module used
const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
// set app server
app.use(express.static("./public"));
app.set("view engine", "ejs");
app.set("views", "./views");
// use template
app.set("view engine", "ejs");
app.set("views", "./views");
// set folder pulic
app.use(express.static("./public"));
// set port
server.listen(process.env.PORT || 4000);
// body parser
const bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.locals.baseURL = "http://127.0.0.1:4000";
// parse application/json
app.use(bodyParser.json());
// seesion
var session = require('express-session');
// io.use(ios(session));
session = require("express-session")({
  resave: true, 
  saveUninitialized: true, 
  secret: 'somesecret', 
  secure: false,
  cookie: { maxAge: 60000000 }
}),
app.use(session);
sharedsession = require("express-socket.io-session");
io.use(sharedsession(session));
// send user
app.use(function(req, res, next) {
  res.locals.user = req.session.user;
  next();
});

/*
// router
const homeRouter = require('./routes/index');
app.use('/home', homeRouter);
const userRouter = require('./routes/user');
app.use('/user', userRouter);
app.get('/', function(req, res){
    res.redirect('/home');
});
app.get('/*', function(req, res){
    res.render('404');
});
// socket io


*/
var user_online = [];
io.on('connection', function(socket){
   
    // code
    socket.on('connect_server', (user_data) => {
        let is_exists =  user_online.some(function(el) {
          return el.id === user_data.id;
        }); 

        if (!is_exists) {
            user_online.push(user_data);
        }

        io.emit('server_send_users_online', user_online);
    });

    socket.on('disconnect_server', (user_data) => {
    
      let is_exists =  user_online.some(function(el) {
        return el.id === user_data.id;
      });

      if (is_exists) {
          user_online.pop(user_data);
      }

      io.emit('server_send_users_online', user_online);
    });


    socket.on('user_chat_all', (data) => {
      io.emit('server_send_chat_all', {user_data: data.user_data, mess: data.mess});
    });









    socket.on('disconnect', function(){
        // code
    });
});
