const productsModel = require('../models/productsModel');

const getAll = async (_req, res) => {
  try {
    const products = await productsModel.getAll();

    return res.status(200).json(products);
  } catch (error) {
    return res.status(404).json({ message: 'Product not found' });
  }
};

module.exports = {
  getAll,
};