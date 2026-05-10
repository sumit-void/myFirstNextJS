import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

export default function ProductDetail({ product }) {
  return (
    <>
      <Head>
        <title>{`${product.title} | MyStore`}</title>
        <meta name="description" content={product.description} />
      </Head>
      <div className="max-w-4xl mx-auto p-8">
        <Link href="/products" prefetch={true} className="text-blue-600 hover:underline mb-4 inline-block">
          ← Back to Products
        </Link>
        <p className="text-gray-500 mb-4 text-sm">
          This page uses Server-Side Rendering (SSR) with getServerSideProps
        </p>

        <div className="bg-white rounded shadow p-6 flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2 flex justify-center relative min-h-[300px]">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-contain max-h-96"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="md:w-1/2">
            <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded uppercase">
              {product.category}
            </span>
            <h1 className="text-2xl font-bold mt-3 mb-4">{product.title}</h1>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <p className="text-2xl text-blue-600 font-bold">${product.price}</p>
            <p className="text-sm text-gray-400 mt-2">
              Rating: {product.rating.rate} ⭐ ({product.rating.count} reviews)
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

// SSR - runs on every request
export async function getServerSideProps(context) {
  const { id } = context.params;
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  const product = await res.json();

  return {
    props: {
      product,
    },
  };
}
