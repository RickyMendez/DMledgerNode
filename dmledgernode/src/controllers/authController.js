var mongodb = require('mongodb').MongoClient;
var passport = require('passport');

var authController = function (authService) {
    var postLogin = function () {
        passport.authenticate('local', {
                failureRedirect: '/'
            }),
            function (req, res) {
                res.redirect('/auth/dashboard');
            }
    };

    var postRegister = function () {
        function (req, res) {
            var url = 'mongodb://localhost:27017/dmledgerdb';
            mongodb.connect(url, function (err, db) {
                var collection = db.collection('users');
                var user = {
                    username: req.body.email,
                    password: req.body.password
                };
                collection.insert(user, function (err, results) {
                    req.login(results.ops[0], function () {
                        res.redirect('/auth/dashboard');
                    });
                });
            });
        }
    };

    var dashboardMiddleware = function (req, res, next) {
        if (!req.user) {
            res.redirect('/');
        }
        next();
    }

    var getDashboard = function (req, res) {
        res.render('dashboard');
    }

    return {
        postLogin: postLogin,
        postRegister: postRegister,
        dashboardMiddleware: dashboardMiddleware,
        getDashboard: getDashboard
    };
}

module.exports = authController;