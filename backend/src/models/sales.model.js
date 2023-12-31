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

const deleteSale = async (id) => {
  await connection.execute('DELETE FROM sales_products WHERE sale_id = ?', [id]);
  await connection.execute('DELETE FROM sales WHERE id = ?', [id]);
  return { type: 204 };
};

const editQtdSale = async (SId, PId, qtd) => {
  await connection.execute(
'UPDATE sales_products SET quantity = ? WHERE sale_id = ? and product_id = ?', 
  [qtd, SId, PId],
);
  await connection.execute(
'UPDATE sales SET date = (NOW()) WHERE id = ?',
   [SId],
);
  const [[date]] = await connection.execute('SELECT date FROM sales WHERE id = ?', [SId]);
  return { type: 200,
    message: {
    date: date.date,
    productId: +PId,
    quantity: +qtd,
    saleId: +SId,
  } };
};

module.exports = {
  getAllSales,
  getSaleById,
  addNewSale,
  deleteSale,
  editQtdSale,
};
