const Joi = require('joi');

const Id = Joi.number();
const Username = Joi.string();
const Email = Joi.string().email();
const Password = Joi.string();

const createPassword = Joi.object({
    username: Username.required(),
    email: Email.required(),
    password: Password.required()
});

const findOne = Joi.object({
    id: Id.required()
});

const Update = Joi.object({
    username: Username,
    email: Email,
    password: Password
})

module.exports = { createPassword, findOne, Update };
