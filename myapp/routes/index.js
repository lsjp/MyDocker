var indexRouter = require('express').Router();

module.exports = function() {
    indexRouter.use('/', require('./welcome')());
    indexRouter.use('/booking', require('./booking')());
    indexRouter.use('/user', require('./user')());
    return indexRouter;
};
