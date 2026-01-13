import { ReactNode } from "react";
import { render } from "@testing-library/react";
import { CartProvider } from "@/lib/context/CartContext";
import { UIProvider } from "@/lib/context/UIContext";

export function renderWithProviders(ui: ReactNode) {
  return render(
    <CartProvider>
      <UIProvider>{ui}</UIProvider>
    </CartProvider>
  );
}
