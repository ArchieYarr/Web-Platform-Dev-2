//package and file imports to give index access to information (i.e. methods in the controller, model and routes)
const express = require('express');
const session = require('express-session');
const router = require('./routes/CW1routes');
const path = require('path');
const mustache = require('mustache-express');
const bodyParser = require("body-parser");
const auth = require('./auth/auth'); 
const passport = require('passport');

const app = express();

const public = path.join(__dirname, 'public');

app.use(express.static(public));
app.engine('mustache', mustache());
app.set('view engine', 'mustache');
app.use(express.urlencoded({extended: false})); 
app.use(session({ secret: 'dont tell anyone', resave: false, saveUninitialized: false })); 
app.use(passport.initialize());
app.use(passport.session()); 
auth.init(app);
app.use('/', router);
app.listen(3000, () => {
    console.log("here");    
    console.log('Server started on port 3000, ctrl^c to quit.'); 
    })
router.use(function(req, res) {
    res.status(404);
    res.send('404 Oops! we didnt find what you are looking for');
})






