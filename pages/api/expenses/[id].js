import { updateExpense, deleteExpense } from './store';

export default function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'PUT') {
    const updated = updateExpense(id, req.body);
    if (updated) {
      return res.status(200).json(updated);
    }
    return res.status(404).json({ message: 'Expense not found' });
  }

  if (req.method === 'DELETE') {
    deleteExpense(id);
    return res.status(200).json({ message: 'Deleted successfully' });
  }

  res.setHeader('Allow', ['PUT', 'DELETE']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
