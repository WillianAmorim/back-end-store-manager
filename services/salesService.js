const salesModel = require('../models/salesModel');

const getAllSales = async () => {
  const sales = await salesModel.getAllSales();

  return sales;
};

module.exports = {
  getAllSales,
};