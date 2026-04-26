'use client'

import { useState } from 'react'
import { useCart } from '@/lib/cart-context'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Lock } from 'lucide-react'

export default function CheckoutPage() {
  const { cart, total, clearCart } = useCart()
  const router = useRouter()
  const shipping = total >= 75 ? 0 : 8
  const orderTotal = total + shipping

  const [form, setForm] = useState({
    name: '', email: '', address: '', city: '', zip: '', country: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async () => {
    const { name, email, address, city, zip, country } = form
    if (!name || !email || !address || !city || !zip || !country) {
      setError('Please fill in all fields.')
      return
    }
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cart.map(i => ({ id: i.id, name: i.name, price: i.price, quantity: i.qty })),
          customerInfo: form,
          total: orderTotal,
        }),
      })
      const data = await res.json()
      if (data.url) {
        // Redirect to Stripe Checkout
        window.location.href = data.url
      } else {
        setError('Something went wrong. Please try again.')
        setLoading(false)
      }
    } catch {
      setError('Network error. Please try again.')
      setLoading(false)
    }
  }

  if (cart.length === 0) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-serif text-3xl font-light text-dark mb-4">Your cart is empty</h1>
          <Link href="/shop" className="text-xs tracking-widest uppercase text-brown underline">Shop Now</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-16 min-h-screen bg-beige">
      <div className="max-w-5xl mx-auto px-6 py-16">
        <h1 className="font-serif text-3xl font-light text-dark mb-10">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Form — left */}
          <div className="lg:col-span-3 space-y-8">
            {/* Contact */}
            <div>
              <p className="text-[11px] tracking-[3px] uppercase text-olive mb-5">Contact Information</p>
              <div className="space-y-4">
                <div>
                  <label className="block text-[11px] tracking-widest uppercase text-olive mb-2">Full Name</label>
                  <input
                    name="name" value={form.name} onChange={handleChange}
                    placeholder="Aria Klass"
                    className="w-full px-4 py-3.5 border border-light-olive bg-cream text-dark text-sm outline-none focus:border-brown transition-colors font-sans"
                  />
                </div>
                <div>
                  <label className="block text-[11px] tracking-widest uppercase text-olive mb-2">Email Address</label>
                  <input
                    name="email" value={form.email} onChange={handleChange} type="email"
                    placeholder="hello@example.com"
                    className="w-full px-4 py-3.5 border border-light-olive bg-cream text-dark text-sm outline-none focus:border-brown transition-colors font-sans"
                  />
                </div>
              </div>
            </div>

            {/* Shipping */}
            <div>
              <p className="text-[11px] tracking-[3px] uppercase text-olive mb-5">Shipping Address</p>
              <div className="space-y-4">
                <div>
                  <label className="block text-[11px] tracking-widest uppercase text-olive mb-2">Street Address</label>
                  <input
                    name="address" value={form.address} onChange={handleChange}
                    placeholder="123 Jewelry Lane"
                    className="w-full px-4 py-3.5 border border-light-olive bg-cream text-dark text-sm outline-none focus:border-brown transition-colors font-sans"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] tracking-widest uppercase text-olive mb-2">City</label>
                    <input
                      name="city" value={form.city} onChange={handleChange}
                      placeholder="Bangkok"
                      className="w-full px-4 py-3.5 border border-light-olive bg-cream text-dark text-sm outline-none focus:border-brown transition-colors font-sans"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] tracking-widest uppercase text-olive mb-2">Postal Code</label>
                    <input
                      name="zip" value={form.zip} onChange={handleChange}
                      placeholder="10100"
                      className="w-full px-4 py-3.5 border border-light-olive bg-cream text-dark text-sm outline-none focus:border-brown transition-colors font-sans"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] tracking-widest uppercase text-olive mb-2">Country</label>
                  <input
                    name="country" value={form.country} onChange={handleChange}
                    placeholder="Thailand"
                    className="w-full px-4 py-3.5 border border-light-olive bg-cream text-dark text-sm outline-none focus:border-brown transition-colors font-sans"
                  />
                </div>
              </div>
            </div>

            {/* Payment note */}
            <div>
              <p className="text-[11px] tracking-[3px] uppercase text-olive mb-5">Payment</p>
              <div className="bg-cream border border-light-olive p-5">
                <div className="flex items-center gap-3 text-olive text-sm mb-3">
                  <Lock size={14} />
                  <span>You will be redirected to Stripe to complete your payment securely.</span>
                </div>
                <div className="flex gap-3 mt-3">
                  {['VISA', 'MC', 'AMEX', 'JCB'].map(card => (
                    <div key={card} className="bg-white border border-light-olive px-2 py-1 text-[10px] text-olive tracking-wider">
                      {card}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {error && <p className="text-red-600 text-sm">{error}</p>}

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full py-5 bg-dark text-cream text-xs tracking-widest uppercase hover:bg-brown transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'Redirecting to payment...' : `Pay $${orderTotal.toFixed(2)}`}
            </button>
          </div>

          {/* Order summary — right */}
          <div className="lg:col-span-2">
            <div className="bg-cream p-7 sticky top-24">
              <h2 className="font-serif text-xl font-light text-dark mb-5 pb-4 border-b border-light-olive">
                Order Summary
              </h2>
              <div className="space-y-4 mb-5">
                {cart.map(item => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span>{item.emoji}</span>
                      <span className="text-dark">{item.name} <span className="text-olive">×{item.qty}</span></span>
                    </div>
                    <span className="text-dark">${(item.price * item.qty).toFixed(0)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-light-olive pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-olive">Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-olive">Shipping</span>
                  <span className="text-olive">{shipping === 0 ? 'Free' : `$${shipping}`}</span>
                </div>
                <div className="flex justify-between font-serif text-xl text-dark pt-2 border-t border-light-olive">
                  <span>Total</span>
                  <span>${orderTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
