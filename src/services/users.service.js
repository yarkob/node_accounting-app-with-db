/* eslint-disable no-console */

const {
  models: { User },
} = require('../models/models');

// const setInitUsers = () => {
//   users = [];
// };

const getUsers = async () => {
  return User.findAll();
};

const getUserById = async (id) => {
  return User.findByPk(id);
};

const deleteUser = (id) => {
  User.destroy({
    where: {
      id,
    },
  });
};

const createUser = async (name) => {
  return User.create({ name });
};

const updateUser = async ({ id, name }) => {
  const todo = await getUserById(id);

  Object.assign(todo, { name });

  return todo;
};

module.exports = {
  // setInitUsers,
  getUsers,
  getUserById,
  deleteUser,
  createUser,
  updateUser,
};
