const express = require('express');

const expensesController = require('../controllers/expenses.controller');

const expensesRouter = express.Router();

expensesRouter.get('/', expensesController.getExpenses);

expensesRouter.get('/:id', expensesController.getExpense);

expensesRouter.post('/', expensesController.createExpense);

expensesRouter.delete('/:id', expensesController.deleteExpense);

expensesRouter.patch('/:id', expensesController.updateExpense);

module.exports = expensesRouter;
