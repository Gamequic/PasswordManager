const express = require('express');

const validationHandler = require('../middlewares/validator.handler');
const { createPassword, findOne, Update } = require('../schemas/password.schema');
const PasswordService = require('../services/password.service');
const { authentication } = require('../middlewares/auth.handler');

const router = express.Router();
const service = new PasswordService();

router.post(
    '/create',
    authentication,
    validationHandler(createPassword, "n/a", true),
    async (req, res, next) => {
        try {
            const body = JSON.parse(req.body.Body);
            const Photo = req.files ? req.files.Photo : undefined
            const userId = req.headers.id;

            const rta = await service.create(body, Photo, userId);
            res.status(201).json(rta);
        } catch (error) {
            next(error);
        }
    }
);

router.get(
    '/findAll/',
    authentication,
    async (req, res, next) => {
        try {
            const userId = req.headers.id;
            const rta = await service.findAll(userId);
            res.status(201).json(rta);
        } catch (error) {
            next(error);
        }
    }
);

router.get(
    '/findOne/',
    authentication,
    validationHandler(findOne, 'query'),
    async (req, res, next) => {
        try {
            const userId = req.headers.id;
            const id = req.query.id;
            const rta = await service.findOne(id, userId);
            res.status(201).json(rta);
        } catch (error) {
            next(error);
        }
    }
);

router.patch(
    '/update',
    authentication,
    validationHandler(findOne, 'query'),
    validationHandler(Update, "n/a", true),
    async (req, res, next) => {
        try {
            const body = JSON.parse(req.body.Body);
            const Photo = req.files ? req.files.Photo : undefined
            const userId = req.headers.id;
            const id = req.query.id;

            const rta = await service.update(id, userId, Photo, body);
            res.status(201).json(rta);
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;
