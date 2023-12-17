const boom = require('boom');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const { models } = require('../libs/sequelize');

class WebsiteService {
    constructor() {}

    async create(data) {
        const newWebsite = await models.Websites.create({
            ...data,
        });
        return newWebsite;
    }

    async findOne(id) {
        const website = await models.Websites.findByPk(id);
        if (!website) {
            throw boom.notFound('Website not found');
        }

        return website;
    }

    async findOneByAdmin(id, adminId) {
        const website = await models.Websites.findByPk(id);
        if (!website) {
            throw boom.notFound('Website not found');
        }
        if (!(website.dataValues.id === id)) {
            throw boom.unauthorized('This website does not belong to you.');
        }
        return website;
    }

    async update(id, changes) {
        const website = await this.findOne(id);
        const rta = await website.update(changes);
        return rta;
    }

    async getMenu(adminId, websiteId) {
        const website = await this.findOneByAdmin(websiteId, adminId);
        let menu = website.dataValues.menu;
        return menu;
    }

    async createCategory({ Name }, adminId, websiteId) {
        const website = await this.findOneByAdmin(websiteId, adminId);
        let menu = website.dataValues.menu;
        menu = {
            ...menu,
            [Name] : {}
        }
        const rta = await this.update(websiteId, {menu})
        return rta;
    }

    async deleteCategory(Name, adminId, websiteId) {
        const website = await this.findOneByAdmin(websiteId, adminId);
        let menu = website.dataValues.menu;
        delete menu[Name];
        const rta = await this.update(websiteId, {menu})
        return menu;
    }

    async createFood(body, photo, adminId, websiteId) {
        const website = await this.findOneByAdmin(websiteId, adminId);

        let menu = website.dataValues.menu;
        if(!menu[body.Category]) {
            throw boom.conflict(`Category ${body.Category} does not exist`)
        }

        let url = undefined;
        if (photo) {
            url = await this.uploadPhoto(photo);
        }

        menu[body.Category] = {
            ...menu[body.Category],
            [body.Name]: {
                ...body,
                url
            }
        }
        
        const rta = await this.update(websiteId, {menu})

        return menu
    }

    async deleteFood({ Name, Category }, adminId, websiteId) {
        const website = await this.findOneByAdmin(websiteId, adminId);
        let menu = website.dataValues.menu;
        
        if (!menu[Category]) {
            throw boom.conflict(`Category: "${Category}" does not exist.`)
        } else if (!menu[Category][Name]) {
            throw boom.conflict(`Product: "${Name}" does not exist.`)
        } else {
            delete menu[Category][Name];
        }
        
        const rta = await this.update(websiteId, {menu})
        return menu;
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

module.exports = WebsiteService;
