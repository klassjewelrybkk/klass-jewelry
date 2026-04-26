'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '@/lib/cart-context'
import { ShoppingBag, Menu, X } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function Navbar() {
  const { itemCount } = useCart()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-beige/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'
      }`}
      style={{ borderBottom: scrolled ? '1px solid rgba(107,112,92,0.15)' : 'none' }}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="Klass Jewelry"
            width={100}
            height={40}
            className="h-10 w-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/shop"
            className="text-xs tracking-widest uppercase text-olive hover:text-dark transition-colors"
          >
            Shop
          </Link>
          <Link
            href="/shop?category=Rings"
            className="text-xs tracking-widest uppercase text-olive hover:text-dark transition-colors"
          >
            Rings
          </Link>
          <Link
            href="/shop?category=Necklaces"
            className="text-xs tracking-widest uppercase text-olive hover:text-dark transition-colors"
          >
            Necklaces
          </Link>
          <Link
            href="/shop?category=Earrings"
            className="text-xs tracking-widest uppercase text-olive hover:text-dark transition-colors"
          >
            Earrings
          </Link>
          <Link
            href="/admin"
            className="text-xs tracking-widest uppercase text-olive hover:text-dark transition-colors"
          >
            Admin
          </Link>
        </div>

        {/* Cart + Mobile Menu */}
        <div className="flex items-center gap-4">
          <Link href="/cart" className="relative text-dark hover:text-brown transition-colors">
            <ShoppingBag size={22} strokeWidth={1.5} />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-brown text-cream rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-medium">
                {itemCount}
              </span>
            )}
          </Link>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden text-dark"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-beige border-t border-light-olive px-6 py-4 flex flex-col gap-4">
          {['shop', 'shop?category=Rings', 'shop?category=Necklaces', 'shop?category=Earrings'].map(path => (
            <Link
              key={path}
              href={`/${path}`}
              onClick={() => setMenuOpen(false)}
              className="text-xs tracking-widest uppercase text-olive hover:text-dark"
            >
              {path.split('=')[1] || path}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}
