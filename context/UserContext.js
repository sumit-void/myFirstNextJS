import { createContext, useState } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null); // null means logged out
  const [expenses, setExpenses] = useState([]);

  const updateUser = (userData) => {
    setUser(userData);
  };

  const totalExpenses = expenses.reduce((acc, curr) => acc + Number(curr.amount), 0);

  return (
    <UserContext.Provider value={{ user, updateUser, expenses, setExpenses, totalExpenses }}>
      {children}
    </UserContext.Provider>
  );
}
