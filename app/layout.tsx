import type { Metadata } from 'next'
import '@/styles/globals.css'
import { CartProvider } from '@/lib/cart-context'
import Navbar from '@/components/Navbar'

export const metadata: Metadata = {
  title: 'Klass Jewelry — Handcrafted Since 1992',
  description: 'Everyday jewelry, elevated. Ethically made, beautifully crafted pieces for the modern woman.',
  keywords: ['jewelry', 'handcrafted', 'rings', 'necklaces', 'earrings', 'luxury'],
  openGraph: {
    title: 'Klass Jewelry',
    description: 'Everyday jewelry, elevated.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <body>
        <CartProvider>
          <Navbar />
          <main>{children}</main>
        </CartProvider>
      </body>
    </html>
  )
}
