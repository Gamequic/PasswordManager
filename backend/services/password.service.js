const boom = require('boom');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const { models } = require('../libs/sequelize');

class PasswordService {
    constructor() {}

    async create(Body, photo, userId) {
        var URL;
        if (photo) {
            URL = await this.uploadPhoto(photo);
        }

        const newPassword = await models.Password.create({
            ...{
                ...Body,
                userId,
                URL
            },
        });

        return newPassword;
    }

    async findAll(userId) {
        const Password = await models.Password.findAll({
            where: {
              userId
            }
          });
        if (!Password) {
            throw boom.notFound('Password not found');
        }

        return Password;
    }

    async findOne(id, userId) {
        const Password = await models.Password.findByPk(id);
        if (!Password) {
            throw boom.notFound('Password not found');
        }

        if (!(userId === Password.dataValues.userId)) {
            throw boom.unauthorized("This passwords do not belong to you");
        }

        return Password;
    }

    async update(id, userId, photo, changes) {
        var URL;
        if (photo) {
            URL = await this.uploadPhoto(photo);
        }

        const Password = await this.findOne(id, userId);
        const rta = await Password.update({
            ...changes,
            URL
        });
        return rta;
    }

    async uploadPhoto(photo) {
        //Check photo
        if (!photo) {
            throw boom.badRequest('No files were uploaded.');
        }

        // //Check extension
        const allowedExtensions = ['.png', '.jpg', '.jpeg'];
        const fileExtension = path.extname(photo.name).toLowerCase();
        if (! await allowedExtensions.includes(fileExtension)) {
            throw boom.badRequest('Invalid file format. Allowed formats are: ' + await allowedExtensions.join(', '));
        }

        //Move photo to public directory
        const uuid = await uuidv4()
        const filePath = __dirname + '/../public/' + `${uuid}${fileExtension}`;
        photo.mv(filePath, (err) => {
            if (err) {
                throw boom.internal(err);
            }
        });

        return `/public/${uuid}${fileExtension}`;
    }
}

module.exports = PasswordService;
