// const { WebsiteSchema, Website } = require('./websites.model');
const { UserSchema, User } = require('./user.model');

function setupModels(sequelize) {
    // Website.init(WebsiteSchema, Website.config(sequelize));
    User.init(UserSchema, User.config(sequelize));

    // Website.associate(sequelize.models);
    // User.associate(sequelize.models);
}

module.exports = setupModels;
