import Link from "next/link";
import Head from "next/head";

export default function Products({ products }) {
  return (
    <>
      <Head>
        <title>Products | MyStore</title>
        <meta name="description" content="Browse all products" />
      </Head>
      <div className="max-w-6xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-6">All Products</h1>
        <p className="text-gray-500 mb-4 text-sm">
          This page uses Static Site Generation (SSG) with getStaticProps
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link key={product.id} href={`/products/${product.id}`}>
              <div className="bg-white rounded shadow p-4 hover:shadow-lg transition cursor-pointer h-full">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-48 object-contain mb-4"
                />
                <h2 className="text-sm font-semibold mb-2 line-clamp-2">
                  {product.title}
                </h2>
                <p className="text-blue-600 font-bold">${product.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

// SSG - runs at build time
export async function getStaticProps() {
  const res = await fetch("https://fakestoreapi.com/products");
  const products = await res.json();

  return {
    props: {
      products,
    },
    revalidate: 60, // ISR - revalidate every 60 seconds
  };
}
