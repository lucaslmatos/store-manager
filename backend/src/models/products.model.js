const connection = require('./connection');

const getAllProducts = async () => {
  const [data] = await connection.execute('SELECT * FROM products order by id ');
  return data;
};

const getProductById = async (id) => {
  const [[data]] = await connection.execute('SELECT * FROM products where id = ?', [id]);
  return data;
};

const addNewProduct = async (name) => {
  await connection.execute('INSERT INTO products (name) VALUES (?)', [name]);
  const [[data]] = await connection.execute('SELECT * FROM products where name = ?', [name]);
  return { type: 201, message: data };
};

module.exports = {
  getAllProducts,
  getProductById,
  addNewProduct,
};
