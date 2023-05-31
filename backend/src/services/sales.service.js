const salesModel = require('../models/sales.model');
const salesMiddlewares = require('../middlewares/sales.middlewares');

const getAllSales = async () => {
  const data = await salesModel.getAllSales();
  return data;
};

const getSaleById = async (id) => {
  const data = await salesModel.getSaleById(id);
  if (salesMiddlewares.validateId(data)) return data;
  return 'error';
};

module.exports = {
  getAllSales,
  getSaleById,
};
