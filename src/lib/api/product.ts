import { Product, ProductFilterParams } from '@/types';

const BASE_URL = 'https://fakestoreapi.com/products';

export async function getProducts(params: ProductFilterParams): Promise<Product[]> {
  const { limit = 10, offset = 0, sort, category, minPrice, maxPrice, search } = params;

  let url = `${BASE_URL}?limit=${limit}&offset=${offset}`;

  if (sort) {
    url += `&sort=${sort}`;
  }
  if (category && category !== 'all') {
    url += `&category=${category}`;
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`API isteği başarısız oldu: ${response.statusText}`);
    }
    let products: Product[] = await response.json();
    if (minPrice !== undefined) {
      products = products.filter(product => product.price >= minPrice);
    }
    if (maxPrice !== undefined) {
      products = products.filter(product => product.price <= maxPrice);
    }
    if (search) {
      const lowerCaseSearch = search.toLowerCase();
      products = products.filter(product =>
        product.title.toLowerCase().includes(lowerCaseSearch)
      );
    }

    return products;
  } catch (error) {
    console.error('Ürünler çekilirken hata oluştu:', error);
    return [];
  }
}

export async function getProductById(id: string): Promise<Product | null> {
  try {
    const response = await fetch(`${BASE_URL}/${id}`);
    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`API isteği başarısız oldu: ${response.statusText}`);
    }
    const product: Product = await response.json();
    return product;
  } catch (error) {
    console.error(`Ürün ID ${id} çekilirken hata oluştu:`, error);
    return null;
  }
}

export async function getCategories(): Promise<string[]> {
  try {
    const response = await fetch(`${BASE_URL}/categories`);
    if (!response.ok) {
      throw new Error(`Kategoriler çekilirken hata oluştu: ${response.statusText}`);
    }
    const categories: string[] = await response.json();
    return ['all', ...categories];
  } catch (error) {
    console.error('Kategoriler çekilirken hata oluştu:', error);
    return [];
  }
}
