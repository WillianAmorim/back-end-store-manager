const mysql = require('./connection');

const getAllProducts = async () => {
  const sql = 'SELECT * FROM StoreManager.products;';

  const [produtcs] = await mysql.execute(sql);

  return produtcs;
};

const getById = async (id) => {
  const sql = 'SELECT * FROM StoreManager.products WHERE id = ?;';

  const [[product]] = await mysql.execute(sql, [id]);

  return product;
};

const create = async (name) => {
  const sql = 'INSERT INTO StoreManager.products (name) VALUES (?);';

  const [{ insertId }] = await mysql.execute(sql, [name]);

  const listAll = await getAllProducts();

  const productId = listAll.find((produc) => produc.id === Number(insertId));

  return productId;
};

const update = async (id, name) => {
  const sql = 'UPDATE StoreManager.products SET name = ? WHERE id = ?;';

  await mysql.execute(sql, [name, id]);
};

module.exports = {
  getAllProducts,
  getById,
  create,
  update,
};