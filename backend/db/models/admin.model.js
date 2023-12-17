const { Model, DataTypes, Sequelize } = require('sequelize');

const ADMIN_TABLE = 'admin';

const AdminSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
    },
    password: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    avaibleUntil: {
        allowNull: false,
        field: 'avaible_until',
        type: DataTypes.DATE,
    },
    websiteId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'website_id',
        defaultValue: undefined,
    },
    childs: {
        allowNull: true,
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        defaultValue: [],
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'create_at',
        defaultValue: Sequelize.NOW,
    },
};

class Admin extends Model {
    static associate(models) {
        Admin.hasMany(models.User, { foreignKey: 'adminId', as: 'users' });
        Admin.hasOne(models.Websites, {
            foreignKey: 'websiteId',
            as: 'website',
        });
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: ADMIN_TABLE,
            modelName: 'Admin',
            timestamps: false,
        };
    }
}

module.exports = { ADMIN_TABLE, AdminSchema, Admin };
