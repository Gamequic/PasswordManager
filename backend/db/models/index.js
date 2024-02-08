const { PasswordSchema, Password } = require('./password.model');
const { UserSchema, User } = require('./user.model');

function setupModels(sequelize) {
    Password.init(PasswordSchema, Password.config(sequelize));
    User.init(UserSchema, User.config(sequelize));

    // Website.associate(sequelize.models);
    // User.associate(sequelize.models);
}

module.exports = setupModels;
