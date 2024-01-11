const express = require('express');

// const validationHandler = require('../middlewares/validator.handler');
// const { createWebsite, createCategory, createFood, getFood } = require('../schemas/website.schema');
// const WebsiteService = require('../services/website.service');
// const { rootAuth, authentication, checkPermission } = require('../middlewares/auth.handler');

const router = express.Router();
// const service = new WebsiteService();

// router.post(
//     '/create',
//     validationHandler(createWebsite, 'body'),
//     rootAuth,
//     async (req, res, next) => {
//         try {
//             const rta = await service.create(req.body);
//             res.status(201).json(rta);
//         } catch (error) {
//             next(error);
//         }
//     },
// );

// router.get(
//     '/menu/',
//     authentication,
//     checkPermission('Menu'),
//     async (req, res, next) => {
//         try {
//             const adminId = req.headers.id;
//             const websiteId = req.headers.websiteId;
//             const rta = await service.getMenu(req.body, adminId, websiteId);
//             res.status(201).json(rta);
//         } catch (error) {
//             next(error);
//         }
//     }
// );

// router.post(
//     '/menu/category',
//     authentication,
//     checkPermission('Menu'),
//     validationHandler(createCategory, 'body'),
//     async (req, res, next) => {
//         try {
//             const adminId = req.headers.id;
//             const websiteId = req.headers.websiteId;
//             const rta = await service.createCategory(req.body, adminId, websiteId);
//             res.status(201).json(rta);
//         } catch (error) {
//             next(error);
//         }
//     }
// );

// router.delete(
//     '/menu/category',
//     authentication,
//     checkPermission('Menu'),
//     validationHandler(createCategory, 'query'),
//     async (req, res, next) => {
//       try {
//         const Category = req.query.Name;
//         const adminId = req.headers.id;
//         const websiteId = req.headers.websiteId;
  
//         const rta = await service.deleteCategory(Category, adminId, websiteId);
//         res.status(201).json(rta);
//       } catch (error) {
//         next(error);
//       }
//     }
//   );

// router.delete(
//     '/menu/food',
//     authentication,
//     checkPermission('Menu'),
//     validationHandler(getFood, 'query'),
//     async (req, res, next) => {
//       try {
//         const { Category, Name } = req.query;
//         const adminId = req.headers.id;
//         const websiteId = req.headers.websiteId;
  
//         const rta = await service.deleteFood({ Category, Name }, adminId, websiteId);
//         res.status(201).json(rta);
//       } catch (error) {
//         next(error);
//       }
//     }
//   );
  

// router.post(
//     '/menu/food',
//     authentication,
//     checkPermission('Menu'),
//     validationHandler(createFood, "n/a", true),
//     async (req, res, next) => {
//         try {
//             const body = JSON.parse(req.body.Body);
//             const Photo = req.files ? req.files.Photo : undefined
//             const adminId = req.headers.id;
//             const websiteId = req.headers.websiteId;

//             console.log(Photo)

//             const rta = await service.createFood(body, Photo, adminId, websiteId);
//             res.status(201).json(rta);
//         } catch (error) {
//             next(error);
//         }
//     }
// );

// router.delete(
//     '/menu/food',
//     authentication,
//     checkPermission('Menu'),
//     async (req, res, next) => {
//         try {
//             const adminId = req.headers.id;
//             const websiteId = req.headers.websiteId;
//             const rta = await service.deleteCategory(req.body, adminId, websiteId);
//             res.status(201).json(rta);
//         } catch (error) {
//             next(error);
//         }
//     }
// );

module.exports = router;
