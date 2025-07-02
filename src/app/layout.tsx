// app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css'; // Global CSS dosyamız
import 'primereact/resources/themes/lara-light-indigo/theme.css'; // PrimeReact teması
import 'primereact/resources/primereact.min.css'; // PrimeReact core CSS
import 'primeicons/primeicons.css'; // PrimeIcons
import { CartProvider } from '../context/CardContext';
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
        <CartProvider>
          <Header />
          <main className="main-content">
            {children}
          </main>
        </CartProvider>
      </body>
    </html>
  );
}
