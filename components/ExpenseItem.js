export default function ExpenseItem({ expense, onEdit, onDelete }) {
  const formatAmount = (amount) => {
    return Number(amount).toLocaleString('en-IN', { style: 'currency', currency: 'INR' });
  };

  const getCategoryColor = (cat) => {
    switch (cat) {
      case 'Food': return 'bg-orange-100 text-orange-800';
      case 'Travel': return 'bg-blue-100 text-blue-800';
      case 'Utilities': return 'bg-yellow-100 text-yellow-800';
      case 'Entertainment': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded shadow p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-l-4 border-blue-500">
      <div>
        <h3 className="font-bold text-lg">{expense.title}</h3>
        <p className="text-gray-500 text-sm">{expense.date}</p>
      </div>
      
      <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
        <span className={`px-2 py-1 rounded text-xs font-medium uppercase ${getCategoryColor(expense.category)}`}>
          {expense.category}
        </span>
        <span className="font-bold text-lg text-red-600">
          -{formatAmount(expense.amount)}
        </span>
        <div className="flex gap-2">
          <button onClick={() => onEdit(expense)} className="text-blue-500 hover:text-blue-700 text-sm font-medium">Edit</button>
          <button onClick={() => onDelete(expense.id)} className="text-red-500 hover:text-red-700 text-sm font-medium">Delete</button>
        </div>
      </div>
    </div>
  );
}
