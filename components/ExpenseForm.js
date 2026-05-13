import { useState, useEffect } from "react";

export default function ExpenseForm({ initialData = null, onSubmit, onCancel }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [date, setDate] = useState("");

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setAmount(initialData.amount);
      setCategory(initialData.category);
      setDate(initialData.date);
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, amount: Number(amount), category, date });
    if (!initialData) {
      // Clear form on add
      setTitle("");
      setAmount("");
      setCategory("Food");
      setDate("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow border mb-6">
      <h3 className="font-bold text-lg mb-4">{initialData ? "Edit Expense" : "Add New Expense"}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-600 mb-1">Title</label>
          <input required type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full border p-2 rounded" />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Amount (₹)</label>
          <input required type="number" step="0.01" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full border p-2 rounded" />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full border p-2 rounded bg-white">
            <option value="Food">Food</option>
            <option value="Travel">Travel</option>
            <option value="Utilities">Utilities</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Date</label>
          <input required type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full border p-2 rounded" />
        </div>
      </div>
      <div className="mt-4 flex gap-2">
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
          {initialData ? "Update" : "Add"} Expense
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
