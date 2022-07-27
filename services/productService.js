const productModel = require('../models/productsModel');
const errorMensage = require('../error/notFoundError');

const nameValidade = (name) => {
  if (!name) throw errorMensage(400, { message: '"name" is required' });

  if (name.length < 5) {
    throw errorMensage(422, { message: '"name" length must be at least 5 characters long' });
  }
};

const getAllProducts = async () => {
  const allProduct = await productModel.getAllProducts();

  return allProduct;
};

const getById = async (id) => {
  const product = await productModel.getById(id);

  if (!product) throw errorMensage(404, { message: 'Product not found' });

  return product;
};

const create = async (name) => {
  nameValidade(name);
  const product = await productModel.create(name);

  return product;
};

const update = async (id, name) => {
  nameValidade(name);

  await productModel.update(id, name);
};

const remove = async (id) => {
  const product = await productModel.getById(id);
  console.log(product);

  if (!product) throw errorMensage(404, { message: 'Product not found' });

  await productModel.remove(id);
};

module.exports = {
  getAllProducts,
  getById,
  create,
  update,
  remove,
};