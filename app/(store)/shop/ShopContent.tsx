'use client'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { PRODUCTS } from '@/lib/products'
import ProductCard from '@/components/ProductCard'

const CATEGORIES = ['All', 'Rings', 'Necklaces', 'Earrings', 'Bracelets']

export default function ShopContent() {
  const searchParams = useSearchParams()
  const [activeFilter, setActiveFilter] = useState('All')

  useEffect(() => {
    const cat = searchParams.get('category')
    if (cat && CATEGORIES.includes(cat)) setActiveFilter(cat)
  }, [searchParams])

  const filtered = activeFilter === 'All'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === activeFilter)

  return (
    <div className="pt-16">
      <div className="bg-cream py-16 px-6 text-center border-b border-light-olive">
        <p className="text-[11px] tracking-[3px] uppercase text-olive mb-2 block">The Full Collection</p>
        <h1 className="font-serif text-4xl font-light text-dark mb-2">Shop All Jewelry</h1>
        <p className="text-olive text-sm mb-8">{filtered.length} pieces</p>
        <div className="flex justify-center flex-wrap gap-0">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-6 py-2.5 text-[11px] tracking-widest uppercase border transition-all duration-200 ${
                activeFilter === cat
                  ? 'bg-dark text-cream border-dark'
                  : 'bg-transparent text-olive border-light-olive hover:border-olive'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-0.5">
          {filtered.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="font-serif text-2xl text-dark mb-3">No pieces found</p>
            <p className="text-olive text-sm">Try a different category</p>
          </div>
        )}
      </div>
    </div>
  )
}
