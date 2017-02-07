var express = require('express');
var authRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var passport = require('passport');

var router = function () {
    var authController = require('../controllers/authController')(null);
    authRouter.route('/register')
        .post(authController.postRegister);
    authRouter.route('/login')
        .post(authController.postLogin);
    authRouter.route('/dashboard')
        .all(authController.dashboardMiddleware)
        .get(authController.getDashboard);
    return authRouter;
};

module.exports = router;