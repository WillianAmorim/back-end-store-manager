const Joi = require('joi');
const productsModel = require('../models/productsModel');
const { NotFoundError } = require('../middlewares/error');
const { runSchema } = require('../middlewares/validators');

const productsService = {

  validateParamsId: runSchema(Joi.object({
      id: Joi.number().required().positive().integer(),
    }).required()),

    validateBodyAdd: runSchema(Joi.object({
      name: Joi.string().required().min(5),
    }).required()),

  async getAll() {
    const items = await productsModel.getAll();
    return items;
  },

  async verifyItem(id) {
    const exists = await productsModel.exists(id);
    if (!exists) throw new NotFoundError('Product not found');
  },

  async getById(id) {
    const item = await productsModel.getById(id);
    return item;
  },

  async create(data) {
    const id = await productsModel.create(data);
    return id;
  },

  async update(name, id) {
    await productsModel.update(name, id);
  },

  async remove(id) {
    await productsModel.remove(id);
  },

  async getByQuery(name) {
    const items = await productsModel.getByQuery(name);
    return items;
  },
};

module.exports = productsService; 