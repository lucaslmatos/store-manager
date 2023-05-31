const salesServices = require('../services/sales.service');

const getAllSales = async (_req, res) => {
  const data = await salesServices.getAllSales();
  return res.status(200).json(data);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  const data = await salesServices.getSaleById(id);
  if (data !== 'error') return res.status(200).json(data);
  return res.status(404).json({ message: 'Sale not found' });
};

const addNewSale = async (req, res) => {
  const sale = req.body;
  const data = await salesServices.addNewSale(sale);
  return res.status(201).json(data);
};

module.exports = {
  getAllSales,
  getSaleById,
  addNewSale,
};
