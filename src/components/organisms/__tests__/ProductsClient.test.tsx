import { render, screen } from "@testing-library/react";
import ProductsClient from "../ProductsClient";

jest.mock("next/navigation", () => ({
  useRouter: () => ({ replace: jest.fn() }),
  useSearchParams: () => new URLSearchParams(),
}));

jest.mock("@/lib/fetcher/api-fetcher", () => ({
  getProducts: async () => [
    {
      id: 1,
      title: "Test Product",
      price: 10,
      description: "",
      category: "electronics",
      image: "",
      rating: { rate: 4, count: 10 },
    },
  ],
}));

describe("ProductsClient", () => {
  it("renders fetched products", async () => {
    render(<ProductsClient categories={["electronics"]} />);

    expect(await screen.findByText("Test Product")).toBeInTheDocument();
  });
});
