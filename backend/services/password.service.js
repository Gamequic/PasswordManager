const boom = require('boom');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const CryptoJS = require("crypto-js");
const { config } = require('./../config/config');

const { models } = require('../libs/sequelize');

class PasswordService {
    constructor() {}

    async encrypt(string) {
        return CryptoJS.AES.encrypt(string, config.passwordSecret).toString();
    }

    async decrypt(string) {
        var decryptString  = CryptoJS.AES.decrypt(string, config.passwordSecret).toString(CryptoJS.enc.Utf8);
        return decryptString;
    }

    async create(Body, photo, userId) {
        var URL;
        if (photo) {
            URL = await this.uploadPhoto(photo);
        }

        const newPassword = await models.Password.create({
            ...{
                ...Body,
                password: this.encrypt(Body.password),
                userId,
                URL
            },
        });

        return newPassword;
    }

    async findAll(userId) {
        const Passwords = await models.Password.findAll({
            where: {
              userId
            }
          });
        if (!Passwords) {
            throw boom.notFound('Password not found');
        }

        for (let Password in Passwords) {
            const encryptPassowrd = Passwords[Password].dataValues.password;
            const decryptPassword = await this.decrypt(encryptPassowrd);
            Passwords[Password].dataValues.password = decryptPassword;
        }

        return Passwords;
    }

    async findOne(id, userId) {
        const Password = await models.Password.findByPk(id);
        if (!Password) {
            throw boom.notFound('Password not found');
        }

        if (!(userId === Password.dataValues.userId)) {
            throw boom.unauthorized("This passwords do not belong to you");
        }

        Password.dataValues.password = await this.decrypt(Password.dataValues.password);

        return Password;
    }

    async update(id, userId, photo, changes) {
        var URL;
        if (photo) {
            URL = await this.uploadPhoto(photo);
        }

        const Password = await this.findOne(id, userId);

        var password = {
            ...changes,
            URL
        };

        if (changes.password) {
            password.password = this.encrypt(changes.password);
        }

        const rta = await Password.update(password);
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
