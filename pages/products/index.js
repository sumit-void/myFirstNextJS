import Link from "next/link";
import Head from "next/head";
import Image from "next/image";

export default function Products({ products = [] }) {
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
            <Link key={product.id} href={`/products/${product.id}`} prefetch={true}>
              <div className="bg-white rounded shadow p-4 hover:shadow-lg transition cursor-pointer h-full flex flex-col">
                <div className="w-full h-48 relative mb-4">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
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
  try {
    const res = await fetch("https://fakestoreapi.com/products");
    
    // Instead of res.json() which can crash the node process on Vercel if it hits Cloudflare HTML
    // We read as text first, then parse safely
    const text = await res.text();
    
    let products = [];
    try {
      products = JSON.parse(text);
    } catch (e) {
      console.warn("API did not return valid JSON. Returning empty array.");
      products = [];
    }

    return {
      props: {
        products: Array.isArray(products) ? products : [],
      },
      revalidate: 60, // ISR - revalidate every 60 seconds
    };
  } catch (error) {
    console.warn("Build time fetch failed, falling back to empty products list.");
    return {
      props: {
        products: [], // Fallback to empty array so build succeeds
      },
      revalidate: 10,
    };
  }
}
