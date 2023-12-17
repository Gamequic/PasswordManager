const Joi = require('joi');

const URL = Joi.string();
const Name = Joi.string();
const Description = Joi.string();
const Price = Joi.number();
const Currency = Joi.string().min(1).max(10);
const Photo = Joi.string();
const Portions = Joi.number();
const PortionsUnit = Joi.string().min(1).max(10);

const createWebsite = Joi.object({
    URL: URL.required(),
});

const createCategory = Joi.object({
    Name: Name.required()
});

const createFood = Joi.object({
    Category: Name.required(),
    Name: Name.required(),
    Price: Price.required(),
    Currency: Currency.required(),
    Description: Description,
    Portions: Portions,
    PortionsUnit: PortionsUnit
});

const getFood = Joi.object({
    Category: Name.required(),
    Name: Name.required()
});

module.exports = { createWebsite, createCategory, createFood, getFood };
