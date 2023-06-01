const connection = require('./connection');

const queryStringAll = 'SELECT sp.sale_id as saleId, ' 
+ 's.date as date, sp.product_id as productId,sp.quantity as quantity '
+ 'FROM sales_products AS sp join sales as s on sp.sale_id = s.id;';

const queryStringId = 'SELECT s.date as date, sp.product_id as productId, sp.quantity as quantity ' 
+ 'FROM sales_products AS sp join sales as s on sp.sale_id = s.id where sp.sale_id = ?;';

const getAllSales = async () => {
  const [data] = await connection.execute(queryStringAll);
  return data;
};

const getSaleById = async (id) => {
  const [data] = await connection.execute(queryStringId, [id]);
  return data;
};

const addNewSale = async (sale) => {
  const { sId, pId, q } = sale;
  await connection.execute('INSERT INTO sales (date) VALUES (NOW());');
  await connection.execute('INSERT INTO sales_products '
  + '(sale_id, product_id, quantity) VALUES (?, ?, ?);', [sId, pId, q]);
  return { productId: pId, quantity: q };
};

module.exports = {
  getAllSales,
  getSaleById,
  addNewSale,
};
