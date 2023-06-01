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

const addNewProduct = async (name) => {
  const validName = productsMiddlewares.validateProductName(name);
  if (validName.type === 200) {
    const data = await productsModel.addNewProduct(name);
    return data;
  }
  return validName;
};                                          

const editProduct = async (id, name) => {
  const validName = productsMiddlewares.validateProductName(name);
  const checkId = await productsModel.getProductById(id);
  if (validName.type === 200 && checkId !== 'erro') {
    const data = await productsModel.editProduct(id, name);
    return data;
  } if (validName.type === 200 && checkId === 'erro') {
     return { type: 404, message: 'Product not found' }; 
  }
  return validName;
};

module.exports = {
  getAllProducts,
  getProductById,
  addNewProduct,
  editProduct,
};
