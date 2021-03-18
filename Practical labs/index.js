const express = require('express')
const path = require('path')
const app = express()
 
const publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath))
app.get('/', function (req, res) {
  res.send('Hello World');
})
 
app.get('/About', function (req, res) {
    // res.send('<h1>About us<h1>');
    res.sendFile(path.join(publicPath, 'about.html'));
  })

  app.use(function(req, res) {
      res.status(404);
      res.send('<p>Not Found</p>');
  })

app.listen(3000)
console.log('application started on port 3000, CtrlC to quit');