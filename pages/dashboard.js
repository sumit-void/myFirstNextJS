import useSWR from "swr";
import Head from "next/head";

// fetcher function for SWR
const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Dashboard() {
  const { data, error, isLoading } = useSWR(
    "https://jsonplaceholder.typicode.com/posts",
    fetcher,
    {
      refreshInterval: 10000, // auto-refresh every 10 seconds
    }
  );

  return (
    <>
      <Head>
        <title>Dashboard | MyStore</title>
        <meta name="description" content="Dashboard with live data" />
      </Head>
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-gray-500 mb-6 text-sm">
          This page uses Client-Side Rendering (CSR) with useSWR. Auto-refreshes
          every 10 seconds.
        </p>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-10">
            <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-2 text-gray-500">Loading...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <p className="text-red-500">Failed to load data. Please try again.</p>
        )}

        {/* Data */}
        {data && (
          <div className="space-y-3">
            {data.slice(0, 20).map((post) => (
              <div key={post.id} className="bg-white rounded shadow p-4">
                <h2 className="font-semibold text-sm">
                  {post.id}. {post.title}
                </h2>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
