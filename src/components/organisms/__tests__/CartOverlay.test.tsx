import { screen, fireEvent } from "@testing-library/react";
import CartOverlay from "../CartOverlay";
import { renderWithProviders } from "@/test-utils/renderWithProviders";

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

describe("CartOverlay", () => {
  it("shows empty message when cart is empty", () => {
    renderWithProviders(<CartOverlay />);

    expect(screen.getByText("Sepet boş 🛒")).toBeInTheDocument();
  });
});
