import { Category } from "./types";

const CATEGORIES_URL = 'https://dummyjson.com/products/categories'
export async function fetchCategories(): Promise<Category[]> {
    
  try {
    const response = await fetch(CATEGORIES_URL);
    if (!response.ok) {
      throw new Error(`API isteği başarısız oldu: ${response.statusText}`);
    }
    const tag_list: Category[] = await response.json();
    return tag_list;
  } catch (error) {
    console.error("hata oluştu:", error);
    return [];
  }
}