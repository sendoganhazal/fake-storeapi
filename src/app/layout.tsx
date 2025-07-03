import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import { CartProvider } from '../context/CardContext';
import Header from '@/components/molecules/Header';

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
          <main className="grid grid-nogutter justify-content-center">
            <div className='col-12 md:col-10'>
              {children}
            </div>
            
          </main>
        </CartProvider>
      </body>
    </html>
  );
}
