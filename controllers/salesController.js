const salesService = require('../services/salesService');

const getAllSales = async (_req, res) => {
  try {
    const sales = await salesService.getAllSales();

    return res.status(200).json(sales);
  } catch (e) {
    return res.status(e.status).json(e.message);
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const sale = await salesService.getById(id);

    return res.status(200).json(sale);
  } catch (e) {
    return res.status(e.status).json(e.message);
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;

    await salesService.remove(id);

    return res.status(204).end();
  } catch (e) {
    return res.status(e.status).json(e.message);
  }
};

module.exports = {
  getAllSales,
  getById,
  remove,
};