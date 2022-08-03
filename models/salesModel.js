const mysql = require('./connection');

const salesModel = {
  async getAll() {
    const sql = `SELECT ps.sale_id AS saleId, sp.date, ps.product_id AS productId, ps.quantity
      FROM StoreManager.sales AS sp
      INNER JOIN StoreManager.sales_products AS ps ON sp.id = ps.sale_id
      ORDER BY sp.id, ps.product_id`;
    const [items] = await mysql.execute(sql);
    return items;
  },

  async getById(id) {
    const sql = `SELECT s.date, sp.product_id AS productId, sp.quantity
    FROM  StoreManager.sales_products AS sp
    INNER JOIN StoreManager.sales AS s ON sp.sale_id = s.id
    WHERE s.id = ?
    `;
    const [item] = await mysql.execute(sql, [id]);
    return item;
  },

  async remove(id) {
    const sql = 'DELETE FROM StoreManager.sales WHERE id = ?';
    await mysql.execute(sql, [id]);
  },

  async exists(id) {
    const sql = 'SELECT 1 FROM StoreManager.sales WHERE id = ?';
    const [[item]] = await mysql.execute(sql, [id]);
    return !!item;
  },

};

module.exports = salesModel; 