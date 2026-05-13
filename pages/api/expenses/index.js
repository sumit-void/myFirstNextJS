import { getExpenses, addExpense } from './store';

export default function handler(req, res) {
  if (req.method === 'GET') {
    return res.status(200).json(getExpenses());
  } 
  
  if (req.method === 'POST') {
    const newExpense = addExpense(req.body);
    return res.status(201).json(newExpense);
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
