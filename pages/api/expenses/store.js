// Simple in-memory store. 
// Note: This will reset when the server restarts or functions spin down on Vercel.
// Initial dummy data
let expenses = [
  { id: '1', title: 'Groceries', amount: 50.25, category: 'Food', date: '2023-10-01' },
  { id: '2', title: 'Uber', amount: 15.50, category: 'Travel', date: '2023-10-02' },
  { id: '3', title: 'Electricity Bill', amount: 60.00, category: 'Utilities', date: '2023-10-03' }
];

export const getExpenses = () => expenses;

export const addExpense = (expense) => {
  const newExpense = { ...expense, id: Date.now().toString() };
  expenses.push(newExpense);
  return newExpense;
};

export const updateExpense = (id, updatedData) => {
  const index = expenses.findIndex(e => e.id === id);
  if (index !== -1) {
    expenses[index] = { ...expenses[index], ...updatedData };
    return expenses[index];
  }
  return null;
};

export const deleteExpense = (id) => {
  expenses = expenses.filter(e => e.id !== id);
};
