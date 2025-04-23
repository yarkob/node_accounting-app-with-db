// let expenses = [];
//
// const setInitExpenses = () => {
//   expenses = [];
// };
//
// const getExpenses = (value, key, initArray) => {
//   let arr = initArray;
//
//   if (!Array.isArray(arr)) {
//     arr = expenses;
//   }
//
//   if ((!value && value !== 0) || !key) {
//     return arr;
//   }
//
//   if (value.fromDate && value.toDate) {
//     return arr.filter(
//       (expense) =>
//         value.fromDate < Date.parse(expense[key]) &&
//         Date.parse(expense[key]) < value.toDate,
//     );
//   }
//
//   return arr.filter((expense) => {
//     return expense[key] === value;
//   });
// };
//
// const getExpenseById = (id) => {
//   return expenses.find((expense) => expense.id === +id) || null;
// };
//
// const deleteExpense = (id) => {
//   expenses = expenses.filter((expense) => expense.id !== +id);
// };
//
// const createExpense = (body) => {
//   const newExpense = { id: genId(expenses), ...body };
//
//   expenses.push(newExpense);
//
//   return newExpense;
// };
//
// const updateExpense = (user) => {
//   let updatedExpense;
//
//   expenses = expenses.map((checkExpense) => {
//     if (checkExpense.id === +user.id) {
//       updatedExpense = {
//         id: checkExpense.id,
//         userId: checkExpense.userId,
//         spentAt: user.spentAt ? user.spentAt : checkExpense.spentAt,
//         title: user.title ? user.title : checkExpense.title,
//         amount: user.amount ? user.amount : checkExpense.amount,
//         category: user.category ? user.category : checkExpense.category,
//         note: user.note ? user.note : checkExpense.note,
//       };
//
//       return updatedExpense;
//     }
//
//     return checkExpense;
//   });
//
//   return updatedExpense;
// };
//
// module.exports = {
//   setInitExpenses,
//   getExpenses,
//   getExpenseById,
//   deleteExpense,
//   createExpense,
//   updateExpense,
// };
