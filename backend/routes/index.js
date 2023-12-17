const express = require('express');
const cors = require('cors');

const Website = require('./website.routes');
const Admin = require('./admin.routes');
const Auth = require('./auth.routes');
const User = require('./user.routes');

function routerApi(app, corsOptions) {
    const router = express.Router();
    app.use('/api/v1', router);

    router.use(cors());

    router.use('/website', Website);
    router.use('/admin', Admin);
    router.use('/auth', Auth);
    router.use('/user', User);
}

module.exports = routerApi;
