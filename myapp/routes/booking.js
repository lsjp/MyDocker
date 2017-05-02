var router = require('express').Router();
var wx = require('../components/service/weixin');
var Promise = require('promise');
var https = require('https');
module.exports = function (passport) {
    router.get('/', function (req, res) {
        console.log("****ip address****", req.connection.remoteAddress);
        console.log("****signature****", req.query.signature);
        console.log("****echostr****", req.query.echostr);
        console.log("****timestamp****", req.query.timestamp);
        console.log("****nonce****", req.query.nonce);

        var data = {
            "ip": req.connection.remoteAddress,
            "token": "weixin",
            "signature": req.query.signature,
            "echostr": req.query.echostr,
            "timestamp": req.query.timestamp,
            "nonce": req.query.nonce
        };

        res.send(req.query.echostr);
        //res.render( './weixin/login',data);
    });

    router.post('/', function (req, res) {
        var reqData = {
            //"ip": req.connection.remoteAddress,
            // TODO will be change when change weixin account
            // daliantuzhu account's token is weixin
            "token": "weixin",
            "signature": req.query.signature,
            "echostr": req.query.echostr,
            "timestamp": req.query.timestamp,
            "nonce": req.query.nonce
        };

        var formData = "";

        /**
         * valid send message legel
         * @returns {*|exports|module.exports}
         */
        var isLegel = function () {
            return new Promise(function (resolve, reject) {
                var flag = wx.isLegel(reqData.signature, reqData.timestamp, reqData.nonce, reqData.token);
                if (!flag) {
                    // reject();
                    console.log("the message is unlegel");
                }
                resolve();
            });
        };

        /**
         * 1.analysis request message;
         * 2.send response message;
         * 3.get user id;
         * @returns userID
         */
        var getReqMsg = function () {
            var userID = wx.processMessage(formData, res);
            return userID;
        };

        /**
         *
         * @param accessObject
         * @returns
         */
        var getUserInfo = function (accessObject) {
            return new Promise(function (resolve, reject) {
                var responseObject = {};

                var access_token = accessObject.access_token;
                var openid = accessObject.openid;

                var url = "https://api.weixin.qq.com/cgi-bin/user/info?access_token=" + access_token + "&openid=" + openid;
                https.get(
                    url
                    , function (res) {
                        if (res.statusCode == 200) {

                            res.setEncoding('utf8');

                            res.on('data', function (chunk) {
                                resposeData = chunk;
                            });

                            res.on("end", function () {
                                var userInfoObject = JSON.parse(resposeData);
                                if (!userInfoObject.errcode) {
                                    resolve(userInfoObject);
                                } else {
                                    console.log("errcode : " + userInfoObject.errcode);
                                    console.log("errmsg : " + userInfoObject.errmsg);
                                    reject();
                                }

                            });

                        } else {
                            reject();
                            console.log("Get WeiXin User Info Fail.");
                        }

                    });
            });
        };

        /**
         * insert or update user
         * @returns {*}
         */
        var upsetUser = function (data) {
            return wx.searchUser(data).then(function (result) {
                if (result) {
                    console.log("this user is exist.");
                    return wx.updateUser(result._id, data);
                } else {
                    console.log("this user is not exist");
                    return wx.addUser(data);
                }
            })
        };


        req.on("data", function (data) {
            formData += data;
        });

        req.on("end", function () {
            isLegel().then(getReqMsg).then(getPlatformAccesstoken).then(getUserInfo).then(upsetUser).then(function (data) {
                if (data._id) {
                    console.log("insert user's _id:" + data._id);
                    console.log("subscribe : " + data.subscribe);
                    console.log("openid : " + data.openid);
                    console.log("nickname : " + data.nickname);
                    console.log("sex : " + data.sex);
                    console.log("language : " + data.language);
                    console.log("city : " + data.city);
                    console.log("province : " + data.province);
                    console.log("country : " + data.country);
                    console.log("headimgurl : " + data.headimgurl);
                    console.log("subscribe_time : " + data.subscribe_time);
                    console.log("remark : " + data.remark);
                } else {
                    console.log("update success!");
                }
            }).catch(function (err) {
                console.log(err);
            });

        });

    });


    /**
     *
     * @param openid
     * resolve(object)
     */
    var getPlatformAccesstoken = function (openid) {
        return new Promise(function (resolve, reject) {
            var resposeData = "";

            var appid = "wx4fd9701c321b527e";
            var secret = "eyBQ86xTkn3ZpOnip0LSMLBv9XYFlYWiWfKtAHNaItl";
            var url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=" + appid + "&secret=" + secret;
            https.get(
                url
                , function (res) {
                    if (res.statusCode == 200) {

                        res.setEncoding('utf8');

                        res.on('data', function (chunk) {
                            resposeData = chunk;
                        });

                        res.on("end", function () {
                            var responseObject = JSON.parse(resposeData);
                            responseObject.openid = openid;
                            resolve(responseObject);
                        });

                    } else {
                        reject();
                        console.log("Get WeiXin Platform Access Token Fail.");
                    }

                });
        });
    };

    var makeMenu = function (obj) {
        var menuPath = '/cgi-bin/menu/create?access_token=' + obj.access_token;
        console.log(menuPath);
        var reqData = {
            "button": [
                {
                    "type": "click",
                    "name": 'music',
                    "key": "V1001_TODAY_MUSIC"
                },
                {
                    "type": "click",
                    "name": "song",
                    "key": "V1001_TODAY_SINGER"
                },
                {
                    "name": "menu",
                    "sub_button": [
                        {
                            "type": "view",
                            "name": "search",
                            "url": "http://www.baidu.com/"
                        },
                        {
                            "type": "view",
                            "name": "vidio",
                            "url": "http://v.qq.com/"
                        },
                        {
                            "type": "click",
                            "name": "zan",
                            "key": "V1001_GOOD"
                        }]
                }]
        };
        var reqJsonData = JSON.stringify(reqData);
        console.log(reqJsonData);

        var options = {
            hostname: 'api.weixin.qq.com',
            port: 443,
            path: menuPath,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': reqJsonData.length
            }
        };

        var req = https.request(options, function(res) {
            var result = '';

            res.on('data', function(chunk) {
                result += chunk;
            });

            res.on('end', function() {
                console.log(result);
                // return Promise.resolve(result);
            });
        });

        req.on('error', function(err) {
            console.log(err);
        });

        req.write(reqJsonData);
        req.end();
    };

    router.get('/showall', function (req, res) {
        console.log('show all valid user');
        wx.searchAllUsers().then(function (data) {
            res.send("user list is :" + JSON.stringify(data));
        });

    });

    router.get('/changeMenu', function (req, res) {
        console.log("change menu start");
        getPlatformAccesstoken().then(makeMenu).then(function(){
            res.send("ffff");
        }).catch(function (e) {
            console.log(e);
        });
    });

    return router;
};