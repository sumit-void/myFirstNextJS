import { useState, useEffect } from "react";
import Head from "next/head";

export default function Home() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/hello")
      .then((res) => res.json())
      .then((data) => {
        setMessage(data.message);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Head>
        <title>Home | MyStore</title>
        <meta name="description" content="Welcome to MyStore - a Next.js app" />
      </Head>
      <div className="max-w-4xl mx-auto p-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Welcome to MyStore</h1>
        <p className="text-gray-600 mb-6">
          This is a Next.js app demonstrating SSG, SSR, CSR, and API Routes.
        </p>

        {/* API Route Message */}
        <div className="bg-white rounded shadow p-6 mt-4">
          <h2 className="text-xl font-semibold mb-2">API Route Response:</h2>
          {loading ? (
            <p className="text-gray-400">Loading...</p>
          ) : (
            <p className="text-blue-600 text-lg font-medium">{message}</p>
          )}
        </div>
      </div>
    </>
  );
}
