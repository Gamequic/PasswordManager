const { AdminSchema, Admin } = require('./admin.model');
const { WebsiteSchema, Website } = require('./websites.model');
const { UserSchema, User } = require('./user.model');

function setupModels(sequelize) {
    Admin.init(AdminSchema, Admin.config(sequelize));
    Website.init(WebsiteSchema, Website.config(sequelize));
    User.init(UserSchema, User.config(sequelize));

    Admin.associate(sequelize.models);
    Website.associate(sequelize.models);
    User.associate(sequelize.models);
}

module.exports = setupModels;
