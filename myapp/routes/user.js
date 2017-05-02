var userRouter = require('express').Router();
var weixinuser = require('../components/model/weixinuser');

module.exports = function () {
    userRouter.get('/', function (req, res) {
        console.log(weixinuser.search("select * from user"));
        res.send('hello user')
    });

    userRouter.get('/add', function (req, res) {
        weixinuser.insert();
        res.send('add')
    });
    return userRouter;
};