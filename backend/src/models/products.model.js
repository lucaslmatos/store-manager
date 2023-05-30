const connection = require('./connection');

const getAllProducts = async () => {
  const [data] = await connection.execute('SELECT * FROM products order by id ');
  return data;
};

const getProductById = async (id) => {
  const [[data]] = await connection.execute('SELECT * FROM products where id = ?', [id]);
  return data;
};

module.exports = {
  getAllProducts,
  getProductById,
};
