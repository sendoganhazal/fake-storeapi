import { getProduct } from "@/lib/fetcher/api-fetcher";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);

  return {
    title: product.title,
    description: product.description,
  };
}

export default async function ProductDetail({
  params,
}: {
  params: { id: string };
}) {
  const product = await getProduct(params.id);

  return (
    <div>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
      <strong>{product.price} $</strong>
    </div>
  );
}
