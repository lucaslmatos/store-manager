const productsServices = require('../services/products.service');

const getAllProducts = async (_req, res) => {
  const data = await productsServices.getAllProducts();
  return res.status(200).json(data);
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const data = await productsServices.getProductById(id);
  if (data !== 'error') return res.status(200).json(data);
  return res.status(404).json({ message: 'Product not found' });
};

module.exports = {
  getAllProducts,
  getProductById,
};
