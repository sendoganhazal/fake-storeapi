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
  const res = await fetch(`${BASE_URL}/products/categories`, {
    cache: "force-cache",
  });
  return res.json();
}
