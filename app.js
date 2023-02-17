const express = require('express');
const ejs = require('ejs');

const htmlController = require('./controllers/htmlController');

const port = process.env.PORT || 3000;

const app = express();

app.use('/assets', express.static(__dirname + '/public'));

app.set('view engine', 'ejs');

htmlController(app);

app.use(function (req, res) {
  // render the error page
  res.status(500);
  res.render('error');
});

app.listen(port);
