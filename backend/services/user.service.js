const boom = require('boom');
const bcrypt = require('bcrypt');
// const nodemailer = require("nodemailer");
// const jwt = require('jsonwebtoken');

const { models } = require('../libs/sequelize');
const { config } = require('../config/config');

class UserService {
    constructor() {}

    async create(data) {
        try {
            const newUser = await models.User.create({
                ...data,
                password: await bcrypt.hashSync(
                    data.password,
                    parseInt(config.saltRounds),
                ),
            });
            delete newUser.dataValues.password;
            return newUser;   
        } catch (error) {
            if (error.errors[0].type === 'unique violation'){
                throw boom.conflict("Email is in use by other user.")
            }
            throw error
        }
    }

    // async find(adminId) {
    //     const rta = await models.User.findAll({
    //         attributes: { exclude: ['password'] },
    //         where: { adminId: adminId },
    //         orderByRaw: `id ASC`,
    //     });
    //     return rta;

    // }

    // async findOne(id, adminId) {
    //     const user = await models.User.findByPk(id);
    //     if (!user) {
    //         throw boom.notFound('User not found.');
    //     }
    //     if (!(user.dataValues.adminId === adminId)) {
    //         throw boom.unauthorized('This user does not belong to you.');
    //     }
    //     delete user.dataValues.password;
    //     return user;
    // }

    // async delete(id, adminId) {
    //     const user = await this.findOne(id, adminId);
    //     await user.destroy();
    //     return { id };
    //   }

    // async update(id, changes, adminId) {
    //     const user = await this.findOne(id, adminId);
    //     if ('permissions' in changes) {
    //       const currentPermissions = user.permissions;
    //       const updatedPermissions = { ...currentPermissions, ...changes.permissions };
    //       const result = await user.update({ permissions: updatedPermissions });
    //       return result;
    //     } else {
    //       const result = await user.update(changes);
    //       return result;
    //     }
    //   }
}

module.exports = UserService;
