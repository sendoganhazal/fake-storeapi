// app/page.tsx (SERVER)
import { getCategories } from "@/lib/fetcher/api-fetcher";
import ProductsClient from "@/components/organisms/ProductsClient";
import { Suspense } from "react";

export default async function Home() {
  const categories = await getCategories();

  return (
    <main className="container">
      <Suspense fallback={<div>Ürünler yükleniyor...</div>}>
        <ProductsClient categories={categories} />
      </Suspense>
    </main>
  );
}
