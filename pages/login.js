import { useState, useContext } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { UserContext } from "../context/UserContext";

export default function Login() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();
  const { updateUser } = useContext(UserContext);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!name || !email) return;

    // Simulate login by setting a cookie
    document.cookie = "token=dummy-token-123; path=/; max-age=86400";
    
    // Update global state
    updateUser({ name, email });
    
    // Redirect to dashboard
    router.push("/dashboard");
  };

  return (
    <>
      <Head>
        <title>Login | MyStore</title>
      </Head>
      <div className="max-w-md mx-auto p-8 mt-10 bg-white rounded shadow">
        <h1 className="text-2xl font-bold mb-6 text-center">Login to MyStore</h1>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
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
          <button 
            type="submit" 
            className="bg-blue-600 text-white p-2 rounded mt-2 hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </>
  );
}
