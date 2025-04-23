const expensesService = require('../services/expenses.service.js');
const usersService = require('../services/users.service.js');

module.exports.getExpenses = (req, res) => {
  const { searchParams } = new URL(req.url, 'http://localhost:3000');
  const userId = searchParams.get('userId');
  const category = searchParams.get('categories');
  const fromParam = searchParams.get('from');
  const toParam = searchParams.get('to');

  if (!userId && !category && !fromParam && !toParam) {
    res.send(expensesService.getExpenses());

    return;
  }

  const fromDate = Date.parse(fromParam);
  const toDate = Date.parse(toParam);

  let newExpenses = [];

  if (userId) {
    newExpenses.push(...expensesService.getExpenses(+userId, 'userId'));
  } else {
    newExpenses.push(...expensesService.getExpenses());
  }

  if (category) {
    newExpenses = expensesService.getExpenses(
      category,
      'category',
      newExpenses,
    );
  }

  if (fromDate && toDate) {
    newExpenses = expensesService.getExpenses(
      { fromDate, toDate },
      'spentAt',
      newExpenses,
    );
  }

  res.send(newExpenses);
};

module.exports.getExpense = (req, res) => {
  const { id } = req.params;

  const todo = expensesService.getExpenseById(id);

  if (!todo) {
    res.sendStatus(404);

    return;
  }

  res.send(todo);
};

module.exports.createExpense = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;
  const newExpense = {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  const expenseUser = usersService
    .getUsers()
    .find((user) => user.id === newExpense.userId);

  if (
    (!userId && userId !== 0) ||
    !spentAt ||
    !title ||
    !amount ||
    !category ||
    !note ||
    !expenseUser
  ) {
    res.sendStatus(400);

    return;
  }

  res.statusCode = 201;

  res.send(expensesService.createExpense(newExpense));
};

module.exports.deleteExpense = (req, res) => {
  const { id } = req.params;

  if (!expensesService.getExpenseById(id)) {
    res.sendStatus(404);

    return;
  }

  expensesService.deleteExpense(id);

  res.sendStatus(204);
};

module.exports.updateExpense = (req, res) => {
  const { id } = req.params;
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (!id) {
    res.sendStatus(400);

    return;
  }

  const newExpense = expensesService.updateExpense({
    id,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  if (!newExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(newExpense);

  res.sendStatus(200);
};
