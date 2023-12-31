const listAllSales = [
  {
    saleId: 1,
    date: '2023-05-30T23:58:40.000Z',
    productId: 1,
    quantity: 5,
  },
  {
    saleId: 1,
    date: '2023-05-30T23:58:40.000Z',
    productId: 2,
    quantity: 10,
  },
  {
    saleId: 2,
    date: '2023-05-30T23:58:40.000Z',
    productId: 3,
    quantity: 15,
  },
];

const saleById = [
  {
    date: '2023-05-30T23:58:40.000Z',
    productId: 3,
    quantity: 15,
  },
];

const newSale = {
    sId: 4,
    pId: 1,
    q: 1,
  };

const newSaleResponse = {
    productId: 1,
    quantity: 1,
  };

module.exports = {
  listAllSales,
  saleById,
  newSale,
  newSaleResponse,
};
