const Joi = require('joi');

const id = Joi.number().integer();
const email = Joi.string().email();
const password = Joi.string().min(8);
const permissions = Joi.object();

const createUserSchema = Joi.object({
    email: email.required(),
    password: password.required(),
});

const getUserSchema = Joi.object({
    id: id.required(),
});

const updateUserSchema = Joi.object({
    permissions: permissions,
    email: email
});

// const updateUserSchema = Joi.object({
//   name: name,
//   lastname: lastname,
//   username: username,
//   email: email,
//   password: password,
//   role: role,
//   descripcion: descripcion,
//   hexaColor,
//   photo, photo,
// });

// const askPasswordReset = Joi.object({
//   email: email.required(),
// });

// const applyPasswordReset = Joi.object({
//   password: password.required(),
//   token: token.required()
// });

module.exports = { createUserSchema, updateUserSchema, getUserSchema };
