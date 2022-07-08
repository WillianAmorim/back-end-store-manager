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

module.exports = {
  getAll,
  getById,
};