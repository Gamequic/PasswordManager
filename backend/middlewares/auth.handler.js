const jwt = require('jsonwebtoken')
const boom = require('boom')

const { config } = require('./../config/config')

function authentication(req, res, next){
    try{ 
        const token = req.headers.authheader;
        const decoded = jwt.verify(token, config.authSecret);
        req.headers.id = decoded.id;
        next();
    } catch (err) {
        throw boom.unauthorized()
        next(err);
    }
}

module.exports = { authentication }