const express = require('express');
const productsController = require('../controllers/products.controller');

const routes = express.Router();
routes.get('/', productsController.getAllProducts);
routes.get('/:id', productsController.getProductById);
routes.post('/', productsController.addNewProduct);

module.exports = routes;