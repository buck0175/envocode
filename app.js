// =====================
// App Requirements
// =====================

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const passportLocalMongoose = require('passport-local-mongoose');

var app = express();

// Mongoose Database
mongoose.connect('mongodb://localhost/portfolio');

app.set('view engine', 'ejs');

// Setting the view engine to EJS
app.set('view engine', 'ejs');

// Serves the custom stylesheets
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));

// PASSPORT CONFIGURATION
// app.use(require('express-session')({
//   secret: "Salwa is so beautiful",
//   resave: false,
//   saveUninitialized: false
// }));
// app.use(passport.initialize());
// app.use(passport.session());
// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());
//
// app.use(function(req, res, next){
//     res.locals.currentUser = req.user;
//     next();
// });

// =================
// ROUTES
// =================

app.get('/', function(req, res){
  res.render('index');
});




// =================
// Server Starter
// =================

// app.listen(process.env.PORT, process.env.IP, function(){
//   console.log('server started!');
// })

app.listen(3333, () => {
    console.log('http://localhost:${3333}');
});
