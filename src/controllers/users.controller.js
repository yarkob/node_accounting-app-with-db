/* eslint-disable no-console */

const usersService = require('../services/users.service');

module.exports.getUsers = async (req, res) => {
  try {
    res.status(200).send(await usersService.getUsers());
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports.getUser = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.sendStatus(400);

    return;
  }

  const todo = await usersService.getUserById(id);

  if (!todo) {
    res.sendStatus(404);

    return;
  }

  res.send(await todo);
};

module.exports.createUser = async (req, res) => {
  const { name } = req.body;

  try {
    res.status(201).send(await usersService.createUser(name));
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

module.exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!(await usersService.getUserById(id))) {
    res.sendStatus(404);

    return;
  }

  await usersService.deleteUser(id);

  res.sendStatus(204);
};

module.exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name || !id) {
    res.sendStatus(400);

    return;
  }

  const newUser = await usersService.updateUser({ id, name });

  if (!newUser) {
    res.sendStatus(404);

    return;
  }

  res.send(newUser);
};
