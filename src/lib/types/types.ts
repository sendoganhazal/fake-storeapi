export type Rating = {
  rate: number;
  count: number;
};

export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
};
export type CartItem = Product & {
  quantity: number;
};


export type CartContextType = {
  items: CartItem[];
  addToCart: (product: Product) => void;
  decreaseQuantity: (id: number) => void;
  clearCart: () => void;
};
