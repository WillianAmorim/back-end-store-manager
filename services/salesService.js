const salesModel = require('../models/salesModel');
const { NotFoundError } = require('../middlewares/error');

const salesService = {
  async getAll() {
    const items = await salesModel.getAll();
    return items;
  },

  async verifyItem(id) {
    const exists = await salesModel.exists(id);
    if (!exists) throw new NotFoundError('Sale not found');
  },

  async getById(id) {
    const item = await salesModel.getById(id);
    return item;
  },

  async remove(id) {
    await salesModel.remove(id);
  },

};

module.exports = salesService;