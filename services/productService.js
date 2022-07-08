const productModel = require('../models/productsModel');
const errorMensage = require('../error/notFoundError');

const getById = async (id) => {
  const product = await productModel.getById(id);

  if (!product) throw errorMensage(404, { message: 'Product not found' });

  return product;
};

const create = async (name) => {
  const product = await productModel.create(name);

  return product;
};

module.exports = {
  getById,
  create,
};