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
const bodyParser = require('body-parser')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
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
// router
const homeRouter = require('./routes/index');
app.use('/home', homeRouter);
const userRouter = require('./routes/user');
app.use('/user', userRouter);
const chatlogRouter = require('./routes/chatlog');
app.use('/chatlog', chatlogRouter);
app.get('/', function(req, res){
    res.redirect('/home');
});
app.get('/*', function(req, res){
    res.render('404');
});
// socket io
var user_online = [];
io.on('connect', function(socket){
  socket.on('client-send-mess', function(data){
      io.sockets.emit('server-send-mess', {mess: data.mess, user: socket.handshake.session.user});  
  });
  if(socket.handshake.session.user != undefined){
    let user = socket.handshake.session.user;
    user.socket_id = socket.id;
    user_online.push(user);
    console.log(user_online);
  }
  io.sockets.emit('server-send-list-user-online', {list_user: user_online});
  socket.on('disconnect', function(){
    if(socket.handshake.session.user != undefined){
      for(i = 0; i < user_online.length; ++i){
        if(user_online[i].socket_id == socket.id){
          user_online.splice(i, 1);
        }
      }
    }
    console.log("user disconnect !!!");
  });
});