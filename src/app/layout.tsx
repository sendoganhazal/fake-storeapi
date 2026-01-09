"use client"
import dynamic from "next/dynamic";
import { CartProvider } from "@/lib/context/CartContext";
import { UIProvider } from "@/lib/context/UIContext";
import { Poppins } from "next/font/google"
import "./globals.css";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
});
const Header = dynamic(() => import("@/components/organisms/Header"), {
  ssr: false,
});

const CartOverlay = dynamic(
  () => import("@/components/organisms/CartOverlay"),
  { ssr: false }
);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <CartProvider>
          <UIProvider>
            <Header />
            <CartOverlay/>
            {children}
          </UIProvider>
        </CartProvider>
      </body>
    </html>
  );
}
