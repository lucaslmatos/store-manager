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

const editProduct = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const { type, message } = await productsServices.editProduct(id, name);
  if (type === 200) { return res.status(type).json(message); }
  return res.status(type).json({ message });
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsServices.deleteProduct(id);
  if (type === 204) { return res.status(type).json(); }
  return res.status(type).json({ message });
};

const searchProduct = async (req, res) => {
  const searched = req.query.q;
  console.log(searched);
  const { type, message } = await productsServices.searchProduct(searched);
  if (type === 200) { return res.status(type).json(message); }
  return res.status(type).json({ message });
};

module.exports = {
  getAllProducts,
  getProductById,
  addNewProduct,
  editProduct,
  deleteProduct,
  searchProduct,
};
