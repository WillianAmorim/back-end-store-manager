const productsService = require('../services/productService');

const getAllProducts = async (_req, res) => {
  const products = await productsService.getAllProducts();

  return res.status(200).json(products);
};

const getById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await productsService.getById(id);
  
    return res.status(200).json(product);
  } catch (e) {
    res.status(e.status).json(e.message);
  }
};

const create = async (req, res) => {
  const { name } = req.body;
  
  try {
    const product = await productsService.create(name);

    return res.status(201).json(product);
  } catch (e) {
    res.status(e.status).json(e.message);
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    await productsService.update(id, name);
    const product = await productsService.getById(id);

    return res.status(200).json(product);
  } catch (error) {
    return res.status(error.status).json(error.message);
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    await productsService.remove(id);

    return res.status(204).end();
  } catch (error) {
    return res.status(error.status).json(error.message);
  }
};

const getByQuery = async (req, res) => {
  try {
    const { q } = req.query;
    console.log(q);

    const product = await productsService.getByQuery(q);

    return res.status(200).json(product);
  } catch (error) {
    return res.status(error.status).json(error.message);
  }
};

module.exports = {
  getAllProducts,
  getById,
  create,
  update,
  remove,
  getByQuery,
};