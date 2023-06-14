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

const checkSale = async (sale) => {
  const allSales = await getAllSales();
  const lastId = (allSales[allSales.length - 1].saleId) + 1;
  const data = { id: lastId, itemsSold: [] };
  const promises = [];

  for (let i = 0; i < sale.length; i += 1) {
    const promise = salesModel
    .addNewSale({ sId: lastId, pId: +sale[i].productId, q: +sale[i].quantity });
    promises.push(promise);
  }

  const results = await Promise.all(promises);

  for (let i = 0; i < results.length; i += 1) {
    const result = results[i];
    data.itemsSold[i] = result;
  }
  return data;
};

const addNewSale = async (sale) => {
  const validateSale = await salesMiddlewares.validateSaleContent(sale);
  if (validateSale.message === 'ok') {
    const data = await checkSale(sale);
    return { type: 201, message: data };
  }
  return validateSale;
};

const deleteSale = async (id) => {
  const checkId = await salesModel.getSaleById(id);
  if (checkId.length !== 0) {
    const data = await salesModel.deleteSale(id);
    return data;
  }
   return { type: 404, message: 'Sale not found' }; 
};

const editQtdSale = async (SId, PId, qtd) => {
  if (qtd <= 0) {
    return { type: 422, message: '"quantity" must be greater than or equal to 1' };
  }
  if (!qtd) {
    return { type: 400, message: '"quantity" is required' };
  }
  const checkSaleId = await salesModel.getSaleById(SId);
  if (checkSaleId.length !== 0) {
    if (!checkSaleId.some((sale) => sale.productId === +PId)) {
      return { type: 404, message: 'Product not found in sale' };
    }
  const data = await salesModel.editQtdSale(SId, PId, qtd);
  return data;
  }
  return { type: 404, message: 'Sale not found' }; 
};

module.exports = {
  getAllSales,
  getSaleById,
  addNewSale,
  checkSale,
  deleteSale,
  editQtdSale,
};
