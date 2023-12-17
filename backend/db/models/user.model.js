const { Model, DataTypes, Sequelize } = require('sequelize');

const USER_TABLE = 'user';

const UserSchema = {
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
    permissions: {
        allowNull: false,
        type: DataTypes.JSONB,
        defaultValue: {
            Menu: false,
            Promotions: false,
            locations: false,
            createUsers: false,
        },
    },
    adminId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        defaultValue: undefined,
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'create_at',
        defaultValue: Sequelize.NOW,
    },
};

class User extends Model {
    static associate(models) {
        User.belongsTo(models.Admin, { foreignKey: 'adminId', as: 'admin' });
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: USER_TABLE,
            modelName: 'User',
            timestamps: false,
        };
    }
}

module.exports = { USER_TABLE, UserSchema, User };
