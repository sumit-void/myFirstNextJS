import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export default function Navbar() {
  const { user, updateUser } = useContext(UserContext);

  const handleLogout = () => {
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
    updateUser(null);
  };

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link href="/" prefetch={true} className="text-xl font-bold">
          MyStore
        </Link>
        <div className="flex gap-4 items-center">
          <Link href="/" prefetch={true} className="hover:underline">
            Home
          </Link>
          <Link href="/products" prefetch={true} className="hover:underline">
            Products
          </Link>
          <Link href="/dashboard" prefetch={true} className="hover:underline">
            Dashboard
          </Link>
          <Link href="/news" prefetch={true} className="hover:underline">
            News
          </Link>
          
          {user ? (
            <div className="flex items-center gap-3 ml-4 border-l border-blue-400 pl-4">
              <span className="text-sm">Hi, {user.name}</span>
              <button 
                onClick={handleLogout}
                className="bg-blue-700 hover:bg-blue-800 px-3 py-1 rounded text-sm transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="ml-4 border-l border-blue-400 pl-4">
              <Link href="/login" prefetch={true} className="bg-white text-blue-600 hover:bg-gray-100 px-3 py-1 rounded text-sm transition font-medium">
                Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
