// module used
const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const cookieParser = require("cookie-parser");
// set app server
app.use(express.static("./public"));
app.use(cookieParser());
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
var ios = require('socket.io-express-session');
io.use(ios(Session));
const session = require('express-session');
app.use(session({
  resave: true, 
  saveUninitialized: true, 
  secret: 'somesecret', 
  secure: false,
  cookie: { maxAge: 60000000 }
}));
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
app.get('/', function(req, res){
    res.redirect('/home');
});


// socket io
io.on('connect', function(socket){
  console.log(socket.handshake.session);
  socket.on('client-send-mess', function(data){
    io.sockets.emit('server-send-mess', {user: data.user, mess: data.mess});
  });
  socket.on('disconnect', function(){
    console.log("user disconnect !!!");
  });
});