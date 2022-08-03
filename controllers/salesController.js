const productsService = require('../services/productService');
const salesService = require('../services/salesService');

const salesController = {
  async getAll(_req, res) {
    const items = await salesService.getAll();
    return res.status(200).json(items);
  },

  async getById(req, res) {
    const { id } = await productsService.validateParamsId(req.params);
    await salesService.verifyItem(id);
    const item = await salesService.getById(id);
    return res.status(200).json(item);
  },

  async remove(req, res) {
    const { id } = await productsService.validateParamsId(req.params);
    await salesService.verifyItem(id);
    await salesService.remove(id);
    return res.sendStatus(204);
  },
};

module.exports = salesController;