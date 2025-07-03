// app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css'; // Genel CSS dosyamız
import { CartProvider } from '@/context/CardContext';
import Header from '@/components/molecules/Header'; // Header bileşenini import et

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Fake Store - Ürünler',
  description: 'Fake Store API kullanarak geliştirilmiş ürün listeleme ve sepet uygulaması.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={inter.className}>
        {/* StyledComponentsRegistry kaldırıldı */}
        <CartProvider>
          <Header /> {/* Header'ı buraya ekle */}
          <main className="main-content"> {/* Tailwind sınıfları yerine düz CSS sınıfı */}
            {children}
          </main>
        </CartProvider>
      </body>
    </html>
  );
}
