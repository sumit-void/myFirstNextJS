import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { UserContext } from "../context/UserContext";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { user, updateUser } = useContext(UserContext);

  useEffect(() => {
    // If the user is already logged in, redirect to dashboard
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  const handleRegister = (e) => {
    e.preventDefault();
    if (!name || !email || !password) return;

    // Simulate registration by setting a cookie
    document.cookie = "token=dummy-token-123; path=/; max-age=86400";
    
    // Update global state
    updateUser({ name, email });
    
    // Redirect to dashboard
    router.push("/dashboard");
  };

  return (
    <>
      <Head>
        <title>Register | Expense Manager</title>
      </Head>
      <div className="max-w-md mx-auto p-8 mt-10 bg-white rounded shadow">
        <h1 className="text-2xl font-bold mb-6 text-center">Create an Account</h1>
        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Name</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border p-2 rounded" 
              placeholder="John Doe"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border p-2 rounded" 
              placeholder="john@example.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border p-2 rounded" 
              placeholder="••••••••"
              required
            />
          </div>
          <button 
            type="submit" 
            className="bg-green-600 text-white p-2 rounded mt-2 hover:bg-green-700 transition font-medium"
          >
            Register
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </>
  );
}
