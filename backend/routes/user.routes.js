const express = require('express');
// const path = require("path");
// const boom = require('boom')

const validationHandler = require('../middlewares/validator.handler');
const {
    createUserSchema,
    updateUserSchema,
    getUserSchema,
} = require('../schemas/user.schema');
const UserService = require('../services/user.service');
const { authentication, checkPermission } = require('../middlewares/auth.handler');

const router = express.Router();
const service = new UserService();

router.post(
    '/create',
    authentication,
    checkPermission('createUsers'),
    validationHandler(createUserSchema, 'body'),
    async (req, res, next) => {
        try {
            const adminId = req.headers.id;
            res.status(201).json(await service.create(req.body, adminId));
        } catch (error) {
            next(error);
        }
    },
);

router.delete(
    '/delete/:id',
    authentication,
    checkPermission('createUsers'),
    validationHandler(getUserSchema, 'params'),
    async (req, res, next) => {
        try {
            const userId = req.params.id;
            const adminId = req.headers.id;
            res.status(201).json(await service.delete(userId, adminId));
        } catch (error) {
            next(error);
        }
    },
);

router.get(
    '/:id',
    authentication,
    checkPermission('createUsers'),
    validationHandler(getUserSchema, 'params'),
    async (req, res, next) => {
        try {
            const adminId = req.headers.id;
            const userId = req.params.id;
            res.json(await service.findOne(userId, adminId));
        } catch (error) {
            next(error);
        }
    },
);

router.get(
    '/',
    authentication,
    checkPermission('createUsers'),
    async (req, res, next) => {
        try {
            const adminId = req.headers.id;
            res.json(await service.find(adminId));
        } catch (error) {
            next(error);
        }
    },
);

router.patch(
    '/:id',
    authentication,
    checkPermission('createUsers'),
    validationHandler(updateUserSchema, 'body'),
    validationHandler(getUserSchema, 'params'),
    async (req, res, next) => {
        try {
            const adminId = req.headers.id;
            const userId = req.params.id;
            const body = req.body;
            res.json(await service.update(userId, body, adminId));
        } catch (error) {
            next(error);
        }
    },
);

// router.get('/:id',
//   validationHandler(getUserSchema, 'params'),
//   authentication,
//   async (req, res, next) => {
//     try {
//       const { id } = req.params;
//       user = await service.findOne(id)
//       delete user.dataValues.password
//       res.json(user);
//     } catch (error) {
//       next(error);
//     }
//   }
// );

// router.patch('/:id',
//   validationHandler(getUserSchema, 'params'),
//   validationHandler(updateUserSchema, 'body'),
//   authentication,
//   authenticationToSelf,
//   async (req, res, next) => {
//     try {
//       const { id } = req.params;
//       const body = req.body;
//       res.status(201).json(await service.update(id, body));
//     } catch (error) {
//       next(error);
//     }
//   }
// );

// router.delete('/:id',
//   validationHandler(getUserSchema, 'params'),
//   authentication,
//   authenticationToSelf,
//   async (req, res, next) => {
//     try {
//       const { id } = req.params;
//       res.status(200).json(await service.delete(id));
//     } catch (error) {
//       next(error);
//     }
//   }
// );

// router.post("/upload-profilephoto/:id",
//   validationHandler(getUserSchema, 'params'),
//   authentication,
//   authenticationToSelf,
//   async (req, res, next) => {
//     try {
//       const { id } = req.params;
//       const profilePhoto = req.files.profilePhoto
//       const user = await service.uploadPhoto(profilePhoto, id);
//       res.status(201).json(user);
//     } catch (error) {
//       next(error);
//     }
//   }
// );

// router.post("/askresetpassword",
//   validationHandler(askPasswordReset, 'body'),
//   async (req, res, next) => {
//     try {
//       const { email } = req.body;
//       rta = await service.askPasswordReset(email)
//       res.status(201).json({rta})
//     } catch (error) {
//       next(error);
//     }
//   }
// );

// router.post("/resetpassword",
//   validationHandler(applyPasswordReset, 'body'),
//   async (req, res, next) => {
//     try {
//       const { password, token } = req.body;
//       user = await service.applyPasswordReset(token, password)
//       res.status(201).json({user: user})
//     } catch (error) {
//       next(error);
//     }
//   }
// );

// router.post("/login",
//   validationHandler(login, 'body'),
//   async (req, res, next) => {
//     try {
//       const { password, email } = req.body;
//       token = await service.logIn(email, password)
//       res.status(201).json(token)
//     } catch (error) {
//       next(error);
//     }
//   }
// );

module.exports = router;
