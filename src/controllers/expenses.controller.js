const expensesService = require('../services/expenses.service.js');
const usersService = require('../services/users.service.js');

module.exports.getExpenses = async (req, res) => {
  try {
    res.send(await expensesService.getExpenses(req.query));
  } catch {
    res.sendStatus(400);
  }
};

module.exports.getExpense = async (req, res) => {
  try {
    const foundExpense = await expensesService.getExpenseById(req.params.id);

    if (!foundExpense) {
      return res.sendStatus(404);
    }

    res.status(200).send(foundExpense);
  } catch (error) {
    res.status(404).send(error);
  }
};

module.exports.createExpense = async (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  const newExpense = {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  if (!(await usersService.getUserById(userId))) {
    res.sendStatus(400);

    return;
  }

  try {
    res.status(201).send(await expensesService.createExpense(newExpense));
  } catch {
    res.sendStatus(400);
  }

  // const expenseUser = usersService
  //   .getUsers()
  //   .find((user) => user.id === newExpense.userId);
  //
  // if (
  //   (!userId && userId !== 0) ||
  //   !spentAt ||
  //   !title ||
  //   !amount ||
  //   !category ||
  //   !note ||
  //   !expenseUser
  // ) {
  //   res.sendStatus(400);
  //
  //   return;
  // }
};

module.exports.deleteExpense = async (req, res) => {
  try {
    await expensesService.deleteExpense(req.params.id);

    res.sendStatus(204);
  } catch {
    res.status(404).send({});
  }
};

module.exports.updateExpense = async (req, res) => {
  const { id } = req.params;
  const params = req.body;

  if (!id) {
    res.sendStatus(400);

    return;
  }

  try {
    const oldExpense = await expensesService.getExpenseById(id);

    const newExpense = await expensesService.updateExpense(
      oldExpense.dataValues,
      {
        id: +id,
        ...params,
      },
    );

    res.send(newExpense);
  } catch {
    res.sendStatus(404);
  }
};
