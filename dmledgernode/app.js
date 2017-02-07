var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');
var mongoose = require('mongoose');

var db = mongoose.connect('mongodb://localhost/dmledgerdb');

var userData = require('./models/bankAccount');

var app = express();
var port = process.env.PORT || 3000;

var authRouter = require('./src/routes/authRoutes')();

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());

require('./src/config/passport')(app);

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use('/Auth', authRouter);

app.get('/', function (req, res) {
    res.render('index');
});

app.listen(port, function (err) {
    console.log('run server on port: ' + port);
});