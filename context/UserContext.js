import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null); // null means logged out
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    // Load user from localStorage on mount
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse stored user", e);
      }
    }
  }, []);

  const updateUser = (userData) => {
    setUser(userData);
    if (userData) {
      localStorage.setItem("user", JSON.stringify(userData));
    } else {
      localStorage.removeItem("user");
    }
  };

  const totalExpenses = expenses.reduce((acc, curr) => acc + Number(curr.amount), 0);

  return (
    <UserContext.Provider value={{ user, updateUser, expenses, setExpenses, totalExpenses }}>
      {children}
    </UserContext.Provider>
  );
}
