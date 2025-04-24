const {
  models: { User },
} = require('../models/models');

const getUsers = async () => {
  return User.findAll();
};

const getUserById = async (id) => {
  return User.findByPk(id);
};

const deleteUser = async (id) => {
  await User.destroy({
    where: {
      id,
    },
  });
};

const createUser = async (name) => {
  return User.create({ name });
};

const updateUser = async ({ id, name }) => {
  const user = await getUserById(id);

  Object.assign(user, { name });

  return user;
};

module.exports = {
  getUsers,
  getUserById,
  deleteUser,
  createUser,
  updateUser,
};
