// app/page.tsx (SERVER)
import { getCategories } from "@/lib/fetcher/api-fetcher";
import ProductsClient from "@/components/organisms/ProductsClient";

export default async function Home() {
  const categories = await getCategories();

  return (
    <main className="container">
      <ProductsClient categories={categories} />
    </main>
  );
}
