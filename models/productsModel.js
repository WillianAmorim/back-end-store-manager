const mysql = require('./connection');

const getAll = async () => {
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

  const listAll = await getAll();

  const productId = listAll.find((produc) => produc.id === Number(insertId));

  return productId;
};

module.exports = {
  getAll,
  getById,
  create,
};