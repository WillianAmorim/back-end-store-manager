const productsService = require('../services/productService');
const productsModel = require('../models/productsModel');

const getAll = async (_req, res) => {
  const products = await productsModel.getAll();

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

module.exports = {
  getAll,
  getById,
  create,
};