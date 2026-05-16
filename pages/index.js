import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
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
      <div className="flex flex-col md:flex-row items-center justify-center min-h-[80vh] px-4 max-w-6xl mx-auto gap-8">
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-5xl font-extrabold text-blue-600 mb-6 tracking-tight">
            Track Your Expenses <br /> Like a Pro.
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto md:mx-0">
            Take control of your finances. Easily add, edit, categorize, and track your daily expenses all in one beautiful dashboard.
          </p>
          
          {user ? (
            <Link href="/dashboard" prefetch={true} className="inline-block bg-blue-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-blue-700 transition transform hover:-translate-y-1">
              Go to Dashboard
            </Link>
          ) : (
            <div className="flex justify-center md:justify-start gap-4">
              <Link href="/register" prefetch={true} className="bg-blue-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-blue-700 transition transform hover:-translate-y-1">
                Get Started
              </Link>
              <Link href="/login" prefetch={true} className="bg-white text-blue-600 border border-blue-600 font-semibold py-3 px-8 rounded-full shadow hover:bg-gray-50 transition">
                Login
              </Link>
            </div>
          )}
        </div>
        <div className="flex-1 flex justify-center items-center p-8">
          <div className="relative w-full max-w-md aspect-square shadow-xl rounded-2xl overflow-hidden">
            <Image 
              src="/hero_image.png" 
              alt="Expense Manager Illustration" 
              fill
              style={{ objectFit: 'cover' }}
              priority
            />
          </div>
        </div>
      </div>
    </>
  );
}
