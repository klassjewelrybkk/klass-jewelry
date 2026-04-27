import Link from 'next/link'
import { PRODUCTS } from '@/lib/products'
import ProductCard from '@/components/ProductCard'

export default function HomePage() {
  const bestSellers = PRODUCTS.filter(p => p.bestseller).slice(0, 4)
  const newArrivals = PRODUCTS.filter(p => p.isNew).slice(0, 4)

  return (
    <div className="pt-16">
      {/* Hero */}
      <section
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #1E2A1A 0%, #2D3D27 50%, #1E2A1A 100%)' }}
      >
        <div className="relative z-10 px-8 md:px-20 max-w-3xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-px" style={{ background: '#7A9468' }}></div>
            <span className="text-[11px] tracking-[4px] uppercase" style={{ color: '#7A9468' }}>New Collection 2025</span>
          </div>
          <h1 className="font-serif text-6xl md:text-8xl font-light leading-none text-white mb-8">
            Everyday<br />Jewelry,<br /><em className="italic" style={{ color: '#7A9468' }}>Elevated</em>
          </h1>
          <p className="text-base leading-loose mb-12 max-w-sm" style={{ color: '#C5D0BE' }}>
            Crafted for the modern woman. Timeless pieces that move with you, from morning light to golden hour.
          </p>
          <div className="flex gap-4">
            <Link
              href="/shop"
              className="inline-block px-10 py-4 text-xs tracking-widest uppercase text-white transition-all duration-300"
              style={{ background: '#3D4A35' }}
            >
              Shop Now
            </Link>
            <Link
              href="/shop"
              className="inline-block border px-10 py-4 text-xs tracking-widest uppercase transition-all duration-300"
              style={{ borderColor: '#7A9468', color: '#C5D0BE' }}
            >
              Our Story
            </Link>
          </div>
        </div>

        {/* Right panel */}
        <div
          className="absolute right-0 top-0 bottom-0 w-2/5 hidden md:flex items-center justify-center"
          style={{ background: 'linear-gradient(160deg, #2D3D27 0%, #3D4A35 100%)' }}
        >
          <div className="text-center" style={{ opacity: 0.15 }}>
            <svg width="200" height="240" viewBox="0 0 200 240" fill="none">
              <ellipse cx="100" cy="80" rx="50" ry="60" stroke="#C5D0BE" strokeWidth="2"/>
              <ellipse cx="100" cy="80" rx="35" ry="42" stroke="#C5D0BE" strokeWidth="1.5"/>
              <circle cx="100" cy="80" r="8" fill="#C5D0BE"/>
              <path d="M60 140 C60 120 140 120 140 140 L130 210 C130 220 70 220 70 210 Z" stroke="#C5D0BE" strokeWidth="2" fill="none"/>
            </svg>
            <p className="font-serif mt-4 tracking-[4px] uppercase text-sm" style={{ color: '#C5D0BE' }}>Klass</p>
          </div>
        </div>

        {/* Scroll */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <div className="w-px h-10 animate-bounce" style={{ background: '#7A9468' }}></div>
          <span className="text-[10px] tracking-[3px] uppercase" style={{ color: '#7A9468' }}>Scroll</span>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <p className="text-[11px] tracking-[3px] uppercase mb-2" style={{ color: '#3D4A35' }}>Loved by Many</p>
        <h2 className="font-serif text-4xl font-light mb-10" style={{ color: '#1E2A1A' }}>Best Sellers</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0.5">
          {bestSellers.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
        <div className="text-center mt-10">
          <Link
            href="/shop"
            className="inline-block border px-8 py-3 text-xs tracking-widest uppercase transition-all duration-300 hover:text-white"
            style={{ borderColor: '#1E2A1A', color: '#1E2A1A' }}
          >
            View All Products
          </Link>
        </div>
      </section>

      {/* Categories */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-6 mb-8">
          <p className="text-[11px] tracking-[3px] uppercase mb-2" style={{ color: '#3D4A35' }}>Browse By</p>
          <h2 className="font-serif text-4xl font-light" style={{ color: '#1E2A1A' }}>Shop the Look</h2>
        </div>
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-0.5">
          {[
            { name: 'Rings', count: '4 pieces', bg: 'linear-gradient(135deg,#2D3D27,#1E2A1A)', emoji: '💍' },
            { name: 'Necklaces', count: '3 pieces', bg: 'linear-gradient(135deg,#3D4A35,#2D3D27)', emoji: '📿' },
            { name: 'Earrings', count: '3 pieces', bg: 'linear-gradient(135deg,#4A5A40,#3D4A35)', emoji: '✦' },
          ].map(cat => (
            <Link
              key={cat.name}
              href={`/shop?category=${cat.name}`}
              className="relative overflow-hidden group block"
              style={{ height: 320 }}
            >
              <div
                className="absolute inset-0 group-hover:scale-105 transition-transform duration-500 flex items-center justify-center"
                style={{ background: cat.bg }}
              >
                <span className="text-8xl" style={{ opacity: 0.15 }}>{cat.emoji}</span>
              </div>
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(30,42,26,0.85) 0%, transparent 60%)' }}></div>
              <div className="absolute bottom-0 left-0 p-6 text-white">
                <h3 className="font-serif text-3xl font-light mb-1">{cat.name}</h3>
                <span className="text-[11px] tracking-widest uppercase" style={{ opacity: 0.7 }}>{cat.count}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* New Arrivals */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <p className="text-[11px] tracking-[3px] uppercase mb-2" style={{ color: '#3D4A35' }}>Just In</p>
        <h2 className="font-serif text-4xl font-light mb-10" style={{ color: '#1E2A1A' }}>New Arrivals</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0.5">
          {newArrivals.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-24 px-6 text-center" style={{ background: '#1E2A1A' }}>
        <div className="max-w-2xl mx-auto">
          <p className="text-[11px] tracking-[3px] uppercase mb-4" style={{ color: '#7A9468' }}>Our Story</p>
          <h2 className="font-serif text-4xl font-light mb-6 text-white">Made with Intention</h2>
          <p className="leading-loose text-sm mb-4" style={{ color: '#C5D0BE' }}>
            Klass was born from a simple belief: that beautiful jewelry should not be reserved for special occasions. Every piece is designed to become part of you — worn daily, worn with everything, worn forever.
          </p>
          <p className="leading-loose text-sm mb-10" style={{ color: '#C5D0BE' }}>
            We work with ethically sourced materials and partner with skilled artisans who share our commitment to quality and sustainability. Each piece is made to last, made to matter. Handcrafted since 1992.
          </p>
          <Link
            href="/shop"
            className="inline-block border px-8 py-3 text-xs tracking-widest uppercase transition-all duration-300 text-white"
            style={{ borderColor: '#7A9468' }}
          >
            Discover Our Collection
          </Link>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="py-16 px-6" style={{ background: '#E8EDE4' }}>
        <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-16 text-center">
          {[
            { title: 'Free Returns', sub: 'Within 30 days' },
            { title: 'Free Worldwide Shipping', sub: 'On every order' },
            { title: 'Ethically Made', sub: 'Responsibly sourced' },
            { title: 'Lifetime Care', sub: 'Repair & polish' },
          ].map(item => (
            <div key={item.title}>
              <p className="font-serif text-xl font-light mb-1" style={{ color: '#1E2A1A' }}>{item.title}</p>
              <p className="text-[11px] tracking-widest uppercase" style={{ color: '#3D4A35' }}>{item.sub}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
