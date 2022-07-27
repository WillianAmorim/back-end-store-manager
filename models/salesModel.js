const mysql = require('./connection');

const getAllSales = async () => {
  const sql = `SELECT sp.sale_id AS saleId, s.date, sp.product_Id AS productId, sp.quantity
    FROM StoreManager.sales AS s
    INNER JOIN StoreManager.sales_products AS sp
    ON s.id = sp.sale_id
    ORDER BY s.id, sp.product_id`;

  const [sales] = await mysql.execute(sql);

  return sales;
};

const getById = async (id) => {
  const sql = `SELECT s.date, sp.product_Id AS productId, sp.quantity
    FROM StoreManager.sales_product AS sp
    INNER JOIN StoreManager.sales AS s
    ON sp.sale_id = s.id
    WHERE s.id = ?;`;

  const [sales] = await mysql.execute(sql, [id]);

  console.log(sales);

  return sales;
};

module.exports = {
  getAllSales,
  getById,
};