import { getProduct } from "@/lib/fetcher/api-fetcher";
import { notFound } from "next/navigation";
import Image from "next/image";
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
    <div>
      <h1>{product.title}</h1>

      <Image
        src={product.image}
        alt={product.title}
        width={300}
        height={300}
      />

      <p>{product.description}</p>
      <strong>${product.price}</strong>
    </div>
  );
}
