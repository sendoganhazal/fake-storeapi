
import ProductClientPage from "@/components/organisms/ProductClientPage";
import { getProduct } from "@/lib/fetcher/api-fetcher";
import { notFound } from "next/navigation";

type Props = {
  params: { id: string };
};

export default async function ProductDetail({ params }: Props) {
  const { id } = await params;

  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

 


  return (
    <main >
      <ProductClientPage product={product}/>
    </main>
  );
}
