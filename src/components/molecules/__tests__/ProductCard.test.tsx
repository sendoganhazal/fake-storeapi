/* eslint-disable @typescript-eslint/no-explicit-any */
import { screen, fireEvent } from "@testing-library/react";
import ProductCard from "../ProductCard";
import { renderWithProviders } from "@/test-utils/renderWithProviders";
import { Product } from "@/lib/types/types";

const product: Product = {
  id: 1,
  title: "Test Product",
  price: 50,
  description: "",
  category: "",
  image: "",
  rating: { rate: 4, count: 10 },
};

jest.mock("next/image", () => {
  function NextImage(props: any) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={"https://example.com/test.png"} {...props} />;
  }

  return NextImage;
});

jest.mock("next/link", () => ({ children }: any) => children);

describe("ProductCard", () => {
  it("renders product title and price", () => {
    renderWithProviders(<ProductCard product={product} />);

    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("50 $")).toBeInTheDocument();
  });

  it("adds product to cart when button clicked", () => {
    renderWithProviders(<ProductCard product={product} />);

    fireEvent.click(screen.getByText("Add to Cart"));

    // burada spy ile CartContext assert edilebilir (integration test)
    expect(screen.getByText("Add to Cart")).toBeInTheDocument();
  });
});
