import { Product } from "@/lib/types/types";

const BASE_URL = "https://fakestoreapi.com";
export async function getProducts(): Promise<Product[]> {
  const res = await fetch("https://fakestoreapi.com/products");

  return res.json();
}
console.log("ENV BASE URL =", process.env.NEXT_PUBLIC_BASE_URL);

export async function getProduct(id: string): Promise<Product | null> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${id}`,
    { cache: "no-store" }
  );

  if (!res.ok) return null;

  return res.json();
}
export async function getCategories(): Promise<string[]> {
 const url = `${process.env.NEXT_PUBLIC_BASE_URL}/products/categories`;

  const res = await fetch(url, {
    cache: "no-store",
  });

  if (!res.ok) {
    console.error("Categories API error:", res.status);
    return [];
  }

  const contentType = res.headers.get("content-type");

  if (!contentType?.includes("application/json")) {
    console.error("Categories response is not JSON");
    return [];
  }
  
  return res.json();
}
