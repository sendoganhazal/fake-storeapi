import { screen, fireEvent } from "@testing-library/react";
import Header from "../Header";
import { renderWithProviders } from "@/test-utils/renderWithProviders";
import { Product } from "@/lib/types/types";

const product: Product = {
  id: 1,
  title: "Test",
  price: 20,
  description: "",
  category: "",
  image: "",
  rating: { rate: 4, count: 10 },
};

jest.mock("@/lib/context/CartContext", () => {
  const original = jest.requireActual("@/lib/context/CartContext");
  return {
    ...original,
    useCart: () => ({
      items: [{ ...product, quantity: 2 }],
    }),
  };
});

jest.mock("@/lib/context/UIContext", () => ({
  useUI: () => ({
    openCart: jest.fn(),
  }),
}));

describe("Header", () => {
  it("shows cart badge with total quantity", () => {
    renderWithProviders(<Header />);

    expect(screen.getByText("2")).toBeInTheDocument();
  });
});
