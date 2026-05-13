import Head from "next/head";
import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export default function Home() {
  const { user } = useContext(UserContext);

  return (
    <>
      <Head>
        <title>Expense Manager</title>
        <meta name="description" content="Manage your expenses efficiently." />
      </Head>
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
        <h1 className="text-5xl font-extrabold text-blue-600 mb-6 tracking-tight">
          Track Your Expenses <br /> Like a Pro.
        </h1>
        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
          Take control of your finances. Easily add, edit, categorize, and track your daily expenses all in one beautiful dashboard.
        </p>
        
        {user ? (
          <Link href="/dashboard" prefetch={true} className="bg-blue-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-blue-700 transition transform hover:-translate-y-1">
            Go to Dashboard
          </Link>
        ) : (
          <div className="flex gap-4">
            <Link href="/register" prefetch={true} className="bg-blue-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-blue-700 transition transform hover:-translate-y-1">
              Get Started
            </Link>
            <Link href="/login" prefetch={true} className="bg-white text-blue-600 border border-blue-600 font-semibold py-3 px-8 rounded-full shadow hover:bg-gray-50 transition">
              Login
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
