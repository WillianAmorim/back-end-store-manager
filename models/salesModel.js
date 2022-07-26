const mysql = require('./connection');

const getAllSales = async () => {
  const sql = 'SELECT * FROM StoreManager.sales;';

  const [sales] = await mysql.execute(sql);

  return sales;
};

module.exports = {
  getAllSales,
};