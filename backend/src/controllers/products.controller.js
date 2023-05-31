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

const addNewProduct = async (req, res) => {
  const { name } = req.body;
  const { type, message } = await productsServices.addNewProduct(name);
  if (type === 201) { return res.status(type).json(message); }
  return res.status(type).json({ message });
};

module.exports = {
  getAllProducts,
  getProductById,
  addNewProduct,
};
