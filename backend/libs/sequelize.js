const { Sequelize } = require('sequelize');

const { config } = require('../config/config');
const setupModels = require('./../db/models/index.js');

const options = {
    dialect: 'postgres',
    logging: false,
    //logging: config.isProd ? false : true,
};

if (config.isProd) {
    options.dialectOptions = {
        ssl: {
            rejectUnauthorized: false,
        },
    };
}

const sequelize = new Sequelize(config.dbUrl, options);

setupModels(sequelize);

sequelize.sync();

module.exports = sequelize;
