'use client'

import { notFound } from 'next/navigation'
import { PRODUCTS } from '@/lib/products'
import { useCart } from '@/lib/cart-context'
import Link from 'next/link'
import { useState } from 'react'
import { ShoppingBag, Heart } from 'lucide-react'

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = PRODUCTS.find(p => p.id === Number(params.id))
  if (!product) notFound()

  const { addToCart } = useCart()
  const [added, setAdded] = useState(false)

  const handleAdd = () => {
    addToCart(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const related = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4)

  return (
    <div className="pt-16">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-10 text-[11px] tracking-widest uppercase text-olive">
          <Link href="/" className="hover:text-dark transition-colors">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-dark transition-colors">Shop</Link>
          <span>/</span>
          <span className="text-dark">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Image Gallery */}
          <div className="space-y-2">
            {/* Main Image */}
            <div
              className="relative overflow-hidden flex items-center justify-center"
              style={{ paddingTop: '110%', background: '#E8E6DF' }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[10rem]">{product.emoji}</span>
              </div>
            </div>
            {/* Thumbnails */}
            <div className="flex gap-2">
              {[0, 1, 2].map(i => (
                <div
                  key={i}
                  className={`w-20 h-20 flex items-center justify-center cursor-pointer text-3xl ${
                    i === 0 ? 'border-2 border-brown' : 'border border-light-olive'
                  }`}
                  style={{ background: '#E8E6DF' }}
                >
                  {product.emoji}
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="pt-4">
            <p className="text-[11px] tracking-[3px] uppercase text-olive mb-3">{product.category}</p>
            <h1 className="font-serif text-4xl font-light text-dark mb-3">{product.name}</h1>
            <p className="text-brown text-2xl font-light mb-6">${product.price}</p>

            <div className="h-px bg-light-olive mb-6"></div>

            <p className="text-olive text-sm leading-loose mb-8">{product.description}</p>

            {/* Material Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {product.tags.map(tag => (
                <span
                  key={tag}
                  className="border border-light-olive text-olive text-[11px] tracking-widest uppercase px-4 py-2"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Buttons */}
            <button
              onClick={handleAdd}
              className="w-full py-4 bg-dark text-cream text-xs tracking-widest uppercase flex items-center justify-center gap-3 hover:bg-brown transition-colors duration-300 mb-3"
            >
              <ShoppingBag size={16} />
              {added ? '✓ Added to Cart' : 'Add to Cart'}
            </button>
            <button className="w-full py-3 border border-dark text-dark text-xs tracking-widest uppercase flex items-center justify-center gap-3 hover:bg-dark hover:text-cream transition-all duration-300">
              <Heart size={16} />
              Save to Wishlist
            </button>

            <div className="h-px bg-light-olive my-6"></div>

            {/* Details */}
            <div className="space-y-3 text-sm text-olive">
              <div className="flex items-center gap-3">
                <span>✓</span>
                <span>Free shipping on orders over $75</span>
              </div>
              <div className="flex items-center gap-3">
                <span>✓</span>
                <span>Free returns within 30 days</span>
              </div>
              <div className="flex items-center gap-3">
                <span>✓</span>
                <span>Ethically sourced materials</span>
              </div>
              <div className="flex items-center gap-3">
                <span>✓</span>
                <span>Handcrafted since 1992</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="mt-24">
            <div className="h-px bg-light-olive mb-12"></div>
            <p className="text-[11px] tracking-[3px] uppercase text-olive mb-2">You May Also Like</p>
            <h2 className="font-serif text-3xl font-light text-dark mb-8">More {product.category}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-0.5">
              {related.map(p => (
                <Link
                  key={p.id}
                  href={`/product/${p.id}`}
                  className="group block bg-cream"
                >
                  <div className="relative overflow-hidden flex items-center justify-center" style={{ paddingTop: '100%', background: '#E8E6DF' }}>
                    <div className="absolute inset-0 flex items-center justify-center text-6xl group-hover:scale-105 transition-transform duration-500">
                      {p.emoji}
                    </div>
                  </div>
                  <div className="p-3 bg-white">
                    <p className="font-serif text-base text-dark">{p.name}</p>
                    <p className="text-brown text-sm">${p.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
