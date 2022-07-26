const salesService = require('../services/salesService');

const allSales = async (_req, res) => {
  const sales = await salesService.getAllSales();

  return res.status(200).json(sales);
};

module.exports = {
  allSales,
};