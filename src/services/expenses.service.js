const {
  models: { Expense },
} = require('../models/models');
const { Op } = require('sequelize');

const getExpenses = async (queryParams) => {
  const { userId, categories, from, to } = queryParams;
  const whereParams = [];

  if (userId) {
    whereParams.push({ userId });
  }

  if (categories) {
    whereParams.push({ category: { [Op.in]: [].concat(categories) } });
  }

  if (from) {
    whereParams.push({ spentAt: { [Op.gte]: from } });
  }

  if (to) {
    whereParams.push({ spentAt: { [Op.lte]: to } });
  }

  return Expense.findAll({
    where: { [Op.and]: whereParams },
  });
};

const getExpenseById = (id) => {
  return Expense.findByPk(id);
};

const deleteExpense = async (id) => {
  await Expense.destroy({
    where: {
      id,
    },
  });
};

const createExpense = async (body) => {
  return Expense.create(body);
};

const updateExpense = async (oldExpense, newExpense) => {
  await Expense.update(newExpense, { where: { id: newExpense.id } });

  return { ...oldExpense, ...newExpense };
};

module.exports = {
  getExpenses,
  getExpenseById,
  deleteExpense,
  createExpense,
  updateExpense,
};
