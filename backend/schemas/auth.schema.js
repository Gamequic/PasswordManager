const Joi = require('joi');

// const role = Joi.string().min(5);
// const descripcion = Joi.string();
// const name = Joi.string();
// const lastname = Joi.string();
// const username = Joi.string();
// const photo = Joi.string();
// const hexaColor = Joi.string();
// const token = Joi.string().min(10)

const email = Joi.string().email();
const password = Joi.string().min(8);

const logIn = Joi.object({
    email: email.required(),
    password: password.required(),
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

// const login = Joi.object({
//   password: password.required(),
//   email: email.required()
// });

// const getUserSchema = Joi.object({
//   id: id.required(),
// });

module.exports = { logIn };
