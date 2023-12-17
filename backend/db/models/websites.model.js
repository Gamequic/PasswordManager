const { Model, DataTypes, Sequelize } = require('sequelize');

const WEBSITE_TABLE = 'Website';

const WebsiteSchema = {
    id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
    },
    adminId: {
        allowNull: true,
        defaultValue: undefined,
        type: DataTypes.INTEGER,
    },
    URL: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    menu: {
        allowNull: true,
        type: DataTypes.JSONB,
        defaultValue: {},
    },
    locations: {
        allowNull: true,
        type: DataTypes.JSONB,
        defaultValue: undefined,
    },
    promotions: {
        allowNull: true,
        type: DataTypes.JSONB,
        defaultValue: undefined,
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'create_at',
        defaultValue: Sequelize.NOW,
    },
};

class Website extends Model {
    static associate(models) {
        Website.belongsTo(models.Admin, { foreignKey: 'adminId', as: 'admin' });
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: WEBSITE_TABLE,
            modelName: 'Websites',
            timestamps: false,
        };
    }
}

module.exports = { WEBSITE_TABLE, WebsiteSchema, Website };
