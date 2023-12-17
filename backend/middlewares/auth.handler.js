const jwt = require('jsonwebtoken');
const boom = require('boom');

const { config } = require('./../config/config');

function authentication(req, res, next) {
    try {
        // Decode JWT
        const token = req.headers.authheader;
        const decoded = jwt.verify(token, config.authSecret);
        
        // GetAdminId
        const role = decoded.role;
        if (role === "admin") {
            req.headers.id = decoded.id;
            req.headers.permission = "admin";
        } else if (role === "user") {
            req.headers.id = decoded.adminId;
            req.headers.permission = decoded.permissions;
        }
        req.headers.websiteId = decoded.websiteId;
        next();
    } catch (err) {
        throw boom.unauthorized();
        next(err);
    }
}

/**
 * Middleware for checking permissions.
 *
 * @param {string} permission - Permission to check.
 *    Valid options: ['Menu', 'locations', 'Promotions', 'createUsers']
 * @returns {Function} The function to check the permissions.
 */
function checkPermission(permission) {
    return (req, res, next) => {
        try {
            if (req.headers.permission === 'admin') {   //Is an admin
                next();
            } else if (req.headers.permission[permission]) {    //Normal user with permissions
                next();
            } else {    //No permission
                throw boom.unauthorized("You don't have permission to do this.");
            }
        } catch (err) {
            next(err);
        }
    }
}

function rootAuth(req, res, next) {
    try {
        const { rootuser, rootpassword } = req.headers;
        if (
            rootuser === config.rootuser &&
            rootpassword === config.rootpassword
        ) {
            next();
        } else {
            throw boom.unauthorized('Root access is need');
        }
    } catch (error) {
        next(error);
    }
}

module.exports = { authentication, checkPermission, rootAuth };
