const productsModel = require('../models/products.model');
const productsMiddlewares = require('../middlewares/products.middlewares');

const getAllProducts = async () => {
  const data = await productsModel.getAllProducts();
  return data;
};

const getProductById = async (id) => {
  const data = await productsModel.getProductById(id);
  if (productsMiddlewares.validateId(data)) return data;
  return 'error';
};

module.exports = {
  getAllProducts,
  getProductById,
};
