const mysql = require('./connection');

const getAll = async () => {
  const sql = 'SELECT * FROM StoreManager.products;';

  const [produtcs] = await mysql.execute(sql);

  return produtcs;
};

module.exports = {
  getAll,
};