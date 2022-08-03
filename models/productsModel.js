const mysql = require('./connection');

const productsModel = {
  async getAll() {
    const sql = 'select * from StoreManager.products';
    const [items] = await mysql.execute(sql);
    return items;
  },

  async getById(id) {
    const sql = 'select * from StoreManager.products where id = ?';
    const [[item]] = await mysql.execute(sql, [id]);
    return item;
  },

  async create(data) {
    const sql = 'insert into StoreManager.products (name) values (?)';
    const [{ insertId }] = await mysql.execute(sql, [data.name]);
    return insertId;
  },

  async update(name, id) {
    const sql = 'UPDATE StoreManager.products SET name = ? WHERE id = ?';
    await mysql.execute(sql, [name, id]);
  },

  async remove(id) {
    const sql = 'DELETE FROM StoreManager.products WHERE id = ?';
    await mysql.execute(sql, [id]);
  },

  async getByQuery(name) {
    const sql = 'SELECT * FROM StoreManager.products WHERE name LIKE ?';
    const [item] = await mysql.execute(sql, [`%${name}%`]);
    return item;
  },

  async exists(id) {
    const sql = 'SELECT 1 FROM StoreManager.products WHERE id = ?';
    const [[item]] = await mysql.execute(sql, [id]);
    return !!item;
  },

};

module.exports = productsModel; 