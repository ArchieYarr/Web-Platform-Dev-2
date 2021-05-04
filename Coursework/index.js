const express = require('express');
const router = require('./routes/CW1routes');
const path = require('path');
const mustache = require('mustache-express');
const app = express();
const public = path.join(__dirname, 'public');
const bodyParser = require("body-parser");

app.use(express.urlencoded({extended: false})); 
app.use('/', router);
app.use(express.static(public));

app.engine('mustache', mustache());
app.set('view engine', 'mustache');

router.use(function(req, res) {
    res.status(404);
    res.send('404 Oops! we didnt find what you are looking for');
})


app.listen(3000, () => {
console.log("here");    
console.log('Server started on port 3000, ctrl^c to quit.'); 
})

