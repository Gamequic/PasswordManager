const { Model, DataTypes, Sequelize } = require('sequelize');

const PASSWORD_TABLE = 'Password';

const PasswordSchema = {
    id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
    },
    userId: {
        allowNull: true,
        defaultValue: undefined,
        type: DataTypes.INTEGER,
    },
    URL: {
        allowNull: true,
        defaultValue: undefined,
        type: DataTypes.STRING,
    },
    username: {
        allowNull: false,
        defaultValue: undefined,
        type: DataTypes.STRING,
    },
    email: {
        allowNull: false,
        defaultValue: undefined,
        type: DataTypes.STRING,
    },
    password: {
        allowNull: false,
        defaultValue: undefined,
        type: DataTypes.STRING,
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'create_at',
        defaultValue: Sequelize.NOW,
    },
};

class Password extends Model {
    // static associate(models) {
    //     Website.belongsTo(models.Admin, { foreignKey: 'adminId', as: 'admin' });
    // }

    static config(sequelize) {
        return {
            sequelize,
            tableName: PASSWORD_TABLE,
            modelName: 'Password',
            timestamps: false,
        };
    }
}

module.exports = { PASSWORD_TABLE, PasswordSchema, Password };
