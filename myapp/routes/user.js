var userRouter = require('express').Router();
var weixinuser = require('../components/model/weixinuser');

module.exports = function () {
    userRouter.get('/', function (req, res) {
        weixinuser.search("select * from user");
    });

    userRouter.get('/add', function (req, res) {
        weixinuser.insert();
    });
    return userRouter;
};