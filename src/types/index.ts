export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface CartItem extends Product {
  quantity: number;
}

export interface ProductFilterParams {
  limit?: number;
  offset?: number;
  sort?: 'asc' | 'desc';
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
}
