import { getProductById } from '../../../lib/api/product';
import ProductDetailDisplay from '../../../components/organisms/ProductDetailDisplay';
import { Metadata } from 'next';
import { notFound } from 'next/navigation'; 

interface ProductDetailPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  const product = await getProductById(params.id);

  if (!product) {
    return {
      title: 'Ürün Bulunamadı',
      description: 'Aradığınız ürün bulunamadı.',
    };
  }

  return {
    title: product.title,
    description: product.description,
    // openGraph: {
    //   title: product.title,
    //   description: product.description,
    //   images: [{ url: product.image }],
    //   type: 'product',
    //   url: `https://your-app-url.com/product/${product.id}`, // Uygulamanızın gerçek URL'si
    // },
    twitter: {
      card: 'summary_large_image',
      title: product.title,
      description: product.description,
      images: [product.image],
    },
  };
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const product = await getProductById(params.id);

  if (!product) {
    notFound(); 
  }

  return <ProductDetailDisplay product={product} />;
}
