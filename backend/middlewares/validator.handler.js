const boom = require('boom');

function validatorHandler(schema, property, isMultipart = false) {
    return (req, res, next) => {
        const data = isMultipart ? JSON.parse(req.body.Body) : req[property];
        const { error } = schema.validate(data, { abortEarly: false });
        if (error) {
            next(boom.badRequest(error));
        }
        next();
    };
}

module.exports = validatorHandler;
