const salesModel = require('../models/salesModel');
const errorMensage = require('../error/notFoundError');

const getAllSales = async () => {
  const sales = await salesModel.getAllSales();

  return sales;
};

const getById = async (id) => {
  const sale = await salesModel.getById(id);

  console.log(sale);

  if (sale.length <= 0) throw errorMensage(404, { message: 'Sale not found' });

  return sale;
};

module.exports = {
  getAllSales,
  getById,
};