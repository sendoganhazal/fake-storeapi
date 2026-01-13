import { renderHook, act } from "@testing-library/react";
import { CartProvider, useCart } from "@/lib/context/CartContext";

type UseCartReturn = ReturnType<typeof useCart>;

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <CartProvider>{children}</CartProvider>
);

describe("CartContext", () => {
  let result: { current: UseCartReturn };

describe("CartContext", () => {
  it("starts with empty cart", () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    expect(result.current.items).toEqual([]);
  });
});
});
