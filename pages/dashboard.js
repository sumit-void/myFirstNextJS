import { useState, useEffect, useContext } from "react";
import useSWR from "swr";
import Head from "next/head";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseItem from "../components/ExpenseItem";
import { UserContext } from "../context/UserContext";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Dashboard() {
  const { data: expensesData, error, isLoading, mutate } = useSWR("/api/expenses", fetcher);
  const { setExpenses } = useContext(UserContext);

  const [editingExpense, setEditingExpense] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Sync with global state
  useEffect(() => {
    if (expensesData) {
      setExpenses(expensesData);
    }
  }, [expensesData, setExpenses]);

  const handleAddExpense = async (expense) => {
    await fetch("/api/expenses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(expense),
    });
    mutate(); // Revalidate SWR
  };

  const handleUpdateExpense = async (expense) => {
    await fetch(`/api/expenses/${editingExpense.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(expense),
    });
    setEditingExpense(null);
    mutate();
  };

  const handleDeleteExpense = async (id) => {
    if (confirm("Are you sure you want to delete this expense?")) {
      await fetch(`/api/expenses/${id}`, { method: "DELETE" });
      mutate();
    }
  };

  // Filtering
  const filteredExpenses = (expensesData || []).filter((exp) => {
    const matchesSearch = exp.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "All" || exp.category === categoryFilter;
    return matchesSearch && matchesCategory;
  }).sort((a, b) => new Date(b.date) - new Date(a.date));

  // Pagination
  const totalPages = Math.ceil(filteredExpenses.length / itemsPerPage);
  const paginatedExpenses = filteredExpenses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <Head>
        <title>Dashboard | Expense Manager</title>
      </Head>
      <div className="max-w-4xl mx-auto p-4 md:p-8">
        <h1 className="text-3xl font-bold mb-6">Expense Dashboard</h1>
        
        {/* Form */}
        {editingExpense ? (
          <ExpenseForm 
            initialData={editingExpense} 
            onSubmit={handleUpdateExpense} 
            onCancel={() => setEditingExpense(null)} 
          />
        ) : (
          <ExpenseForm onSubmit={handleAddExpense} />
        )}

        {/* Filters */}
        <div className="bg-white p-4 rounded shadow mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
          <input 
            type="text" 
            placeholder="Search by title..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border p-2 rounded w-full md:w-1/2"
          />
          <select 
            value={categoryFilter} 
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="border p-2 rounded w-full md:w-1/4 bg-white"
          >
            <option value="All">All Categories</option>
            <option value="Food">Food</option>
            <option value="Travel">Travel</option>
            <option value="Utilities">Utilities</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Loading / Error States */}
        {isLoading && <p className="text-gray-500 animate-pulse text-center my-10">Loading expenses...</p>}
        {error && <p className="text-red-500 text-center my-10">Failed to load expenses.</p>}

        {/* List */}
        {!isLoading && !error && (
          <div className="space-y-4">
            {paginatedExpenses.length > 0 ? (
              paginatedExpenses.map((exp) => (
                <ExpenseItem 
                  key={exp.id} 
                  expense={exp} 
                  onEdit={setEditingExpense} 
                  onDelete={handleDeleteExpense} 
                />
              ))
            ) : (
              <p className="text-gray-500 text-center py-8">No expenses found.</p>
            )}
          </div>
        )}

        {/* Pagination Controls */}
        {!isLoading && !error && totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-8">
            <button 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              className="px-4 py-2 border rounded disabled:opacity-50 hover:bg-gray-100"
            >
              Previous
            </button>
            <span className="text-sm font-medium">Page {currentPage} of {totalPages}</span>
            <button 
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              className="px-4 py-2 border rounded disabled:opacity-50 hover:bg-gray-100"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </>
  );
}
