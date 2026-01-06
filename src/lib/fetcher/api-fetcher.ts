import { Product } from "@/lib/types/types";

const BASE_URL = "https://fakestoreapi.com";
export async function getProducts(): Promise<Product[]> {
  const res = await fetch("https://fakestoreapi.com/products");
  return res.json();
}


export async function getProduct(id: string): Promise<Product> {
  const res = await fetch(`${BASE_URL}/products/${id}`, {
    cache: "no-store",
  });
  return res.json();
}

export async function getCategories(): Promise<string[]> {
  const res = await fetch(`${BASE_URL}/products/categories`, {
    cache: "force-cache",
  });
  return res.json();
}
