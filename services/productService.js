const productModel = require('../models/productsModel');
const errorMensage = require('../error/notFoundError');

const getById = async (id) => {
  const product = await productModel.getById(id);

  if (!product) throw errorMensage(404, { message: 'Product not found' });

  return product;
};

module.exports = {
  getById,
};