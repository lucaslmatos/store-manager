const express = require('express');
const salesController = require('../controllers/sales.controller');

const routes = express.Router();
routes.get('/', salesController.getAllSales);
routes.get('/:id', salesController.getSaleById);
routes.post('/', salesController.addNewSale);

module.exports = routes;