'use client'

import Link from 'next/link'
import { Product } from '@/lib/products'
import { useCart } from '@/lib/cart-context'
import { useState } from 'react'

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart()
  const [added, setAdded] = useState(false)

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <Link href={`/product/${product.id}`} className="group block bg-cream">
      {/* Image */}
      <div className="relative overflow-hidden" style={{ paddingTop: '120%', background: '#E8E6DF' }}>
        {product.isNew && (
          <span className="absolute top-3 left-3 z-10 bg-dark text-cream text-[10px] tracking-widest uppercase px-2 py-1">
            New
          </span>
        )}
        {product.bestseller && (
          <span className="absolute top-3 right-3 z-10 bg-brown text-cream text-[10px] tracking-widest uppercase px-2 py-1">
            Best Seller
          </span>
        )}
        {/* Emoji placeholder — replace with <Image /> when real photos available */}
        <div className="absolute inset-0 flex items-center justify-center text-8xl group-hover:scale-105 transition-transform duration-500">
          {product.emoji}
        </div>

        {/* Quick Add overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-dark/90 py-3 text-center translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button
            onClick={handleAdd}
            className="text-cream text-xs tracking-widest uppercase w-full"
          >
            {added ? '✓ Added' : 'Quick Add'}
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="p-4 bg-white">
        <p className="text-[11px] tracking-widest uppercase text-olive mb-1">{product.category}</p>
        <h3 className="font-serif text-lg font-medium text-dark mb-1">{product.name}</h3>
        <p className="text-brown font-medium">${product.price}</p>
      </div>
    </Link>
  )
}
