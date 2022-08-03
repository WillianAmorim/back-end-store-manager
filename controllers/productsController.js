const productsService = require('../services/productService');

const productsController = {
  async getAll(_req, res) {
    const items = await productsService.getAll();
    return res.status(200).json(items);
  },

  async getById(req, res) {
    const { id } = await productsService.validateParamsId(req.params);
    await productsService.verifyItem(id);
    const item = await productsService.getById(id);
    return res.status(200).json(item);
  },

  async create(req, res) {
    const data = await productsService.validateBodyAdd(req.body);
    const id = await productsService.create(data);
    const item = await productsService.getById(id);
    return res.status(201).json(item);
  },

  async update(req, res) {
    const { name } = await productsService.validateBodyAdd(req.body);
    const { id } = await productsService.validateParamsId(req.params);
    await productsService.verifyItem(id);
    await productsService.update(name, id);
    const item = await productsService.getById(id); 
    return res.status(200).json(item);
  },

  async remove(req, res) {
    const { id } = await productsService.validateParamsId(req.params);
    await productsService.verifyItem(id);
    await productsService.remove(id);
    return res.sendStatus(204);
  },

  async getByQuery(req, res) {
    const { q } = req.query;
    const items = await productsService.getByQuery(q);
    res.status(200).json(items);
  },
};

module.exports = productsController; 