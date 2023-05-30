const express = require('express');
const productsController = require('../controllers/products.controller');

const routes = express.Router();
routes.get('/', productsController.getAllProducts);
routes.get('/:id', productsController.getProductById);

module.exports = routes;