import { Category, Product } from "./types";
import { ParamValue } from 'next/dist/server/request/params'
const BASE_URL = 'https://dummyjson.com';
const CATEGORIES_URL = 'https://dummyjson.com/products/categories'
const PROD_BY_CAT_BASE_URL = 'https://dummyjson.com/products/category';
const  PRODUCT_BASE_URL = 'https://dummyjson.com/products'
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

export async function fetchProductByCategory(params: ParamValue) {
    const url = `${PROD_BY_CAT_BASE_URL}/${params}`;
    console.log("f",url)
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`API isteği başarısız oldu: ${response.statusText}`);
    }
    const data = await response.json();
    const products_by_categories :Product[]= data.products;
    return products_by_categories;
  } catch (error) {
    console.error("hata oluştu:", error);
    return [];
  }
}

export async function fetchProduct(params: ParamValue) {
    const url = `${PRODUCT_BASE_URL}/${params}`;
    console.log("f",url)
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`API isteği başarısız oldu: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("hata oluştu:", error);
    return [];
  }
}

export async function searchedProducts(params: string) {
    const url = `${BASE_URL}${params}`;
    console.log("f",url)
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`API isteği başarısız oldu: ${response.statusText}`);
    }
    const res = await response.json();
    const data:Product[] = res.products;
    return data;
  } catch (error) {
    console.error("hata oluştu:", error);
    return [];
  }
}