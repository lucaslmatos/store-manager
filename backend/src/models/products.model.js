const connection = require('./connection');

const getAllProducts = async () => {
  const [data] = await connection.execute('SELECT * FROM products order by id ');
  console.log(data);
  return data;
};

const getProductById = async (id) => {
  const [[data]] = await connection.execute('SELECT * FROM products where id = ?', [id]);
  if (data !== undefined) return data;
  return 'erro';
};

const addNewProduct = async (name) => {
  await connection.execute('INSERT INTO products (name) VALUES (?)', [name]);
  const [[data]] = await connection.execute('SELECT * FROM products where name = ?', [name]);
  return { type: 201, message: data };
};

const editProduct = async (id, name) => {
  await connection.execute('UPDATE products SET name = ? WHERE id = ?', [name, id]);
  return { type: 200, message: { id: +id, name } };
};

const deleteProduct = async (id) => {
  await connection.execute('DELETE FROM products WHERE id = ?', [id]);
  return { type: 204 };
};

const searchProduct = async (searchParam) => {
  const data = await getAllProducts();
  const resultSearch = data.filter((product) => product.name.includes(searchParam));
  return { type: 200, message: resultSearch };
};

module.exports = {
  getAllProducts,
  getProductById,
  addNewProduct,
  editProduct,
  deleteProduct,
  searchProduct,
};
