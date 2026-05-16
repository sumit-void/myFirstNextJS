import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export default function Navbar() {
  const { user, updateUser, totalExpenses } = useContext(UserContext);

  const handleLogout = () => {
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
    updateUser(null);
    window.location.href = "/login";
  };

  const formattedTotal = Number(totalExpenses || 0).toLocaleString('en-IN', { style: 'currency', currency: 'INR' });

  return (
    <nav className="bg-blue-800 text-white p-4 sticky top-0 z-10 shadow">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link href="/" prefetch={true} className="text-xl font-bold tracking-tight">
          Expense<span className="text-green-400">Manager</span>
        </Link>
        <div className="flex gap-4 items-center">
          <Link href="/dashboard" prefetch={true} className="hover:text-green-300 font-medium transition">
            Dashboard
          </Link>
          
          {user ? (
            <div className="flex items-center gap-4 ml-4 border-l border-blue-600 pl-4">
              <div className="flex flex-col text-right">
                <span className="text-sm text-gray-300">Total Expenses</span>
                <span className="font-bold text-green-400">{formattedTotal}</span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-sm font-medium">{user.name}</span>
                <button 
                  onClick={handleLogout}
                  className="text-xs text-red-300 hover:text-red-100 transition"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="ml-4 border-l border-blue-600 pl-4 flex gap-2">
              <Link href="/login" prefetch={true} className="text-sm hover:underline">
                Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
