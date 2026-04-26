'use client'

import { useCart } from '@/lib/cart-context'
import Link from 'next/link'
import { Trash2, Plus, Minus } from 'lucide-react'

export default function CartPage() {
  const { cart, removeFromCart, updateQty, total } = useCart()
  const shipping = total >= 75 ? 0 : 8
  const orderTotal = total + shipping

  if (cart.length === 0) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="text-center px-6">
          <div className="font-serif text-6xl mb-6 opacity-20">∅</div>
          <h1 className="font-serif text-3xl font-light text-dark mb-4">Your cart is empty</h1>
          <p className="text-olive text-sm mb-8">Discover beautiful pieces made just for you.</p>
          <Link
            href="/shop"
            className="inline-block bg-dark text-cream px-10 py-4 text-xs tracking-widest uppercase hover:bg-brown transition-colors"
          >
            Shop the Collection
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-16 min-h-screen bg-beige">
      <div className="max-w-5xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="border-b border-light-olive pb-6 mb-10">
          <h1 className="font-serif text-3xl font-light text-dark">
            Your Cart <span className="text-olive text-xl">({cart.length} {cart.length === 1 ? 'item' : 'items'})</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Items */}
          <div className="lg:col-span-2 space-y-0">
            {cart.map(item => (
              <div key={item.id} className="flex gap-5 py-6 border-b border-light-olive">
                {/* Image */}
                <div
                  className="w-24 h-24 flex-shrink-0 flex items-center justify-center text-4xl"
                  style={{ background: '#E8E6DF' }}
                >
                  {item.emoji}
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] tracking-widest uppercase text-olive mb-1">{item.category}</p>
                  <h3 className="font-serif text-lg text-dark mb-1">{item.name}</h3>
                  <p className="text-brown text-sm mb-3">${item.price} each</p>

                  {/* Qty control */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => updateQty(item.id, item.qty - 1)}
                      className="w-7 h-7 border border-light-olive flex items-center justify-center hover:border-dark hover:bg-dark hover:text-cream transition-all"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="text-sm w-5 text-center">{item.qty}</span>
                    <button
                      onClick={() => updateQty(item.id, item.qty + 1)}
                      className="w-7 h-7 border border-light-olive flex items-center justify-center hover:border-dark hover:bg-dark hover:text-cream transition-all"
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                </div>

                {/* Price + Remove */}
                <div className="flex flex-col items-end justify-between">
                  <p className="font-serif text-lg text-dark">${(item.price * item.qty).toFixed(0)}</p>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-olive hover:text-dark transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-cream p-8 sticky top-24">
              <h2 className="font-serif text-xl font-light text-dark mb-6 pb-4 border-b border-light-olive">
                Order Summary
              </h2>
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-olive">Subtotal</span>
                  <span className="text-dark">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-olive">Shipping</span>
                  <span className={shipping === 0 ? 'text-olive' : 'text-dark'}>
                    {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-[11px] text-olive">Add ${(75 - total).toFixed(2)} more for free shipping</p>
                )}
              </div>
              <div className="border-t border-light-olive pt-4 mb-6">
                <div className="flex justify-between">
                  <span className="font-serif text-xl text-dark">Total</span>
                  <span className="font-serif text-xl text-dark">${orderTotal.toFixed(2)}</span>
                </div>
              </div>
              <Link
                href="/checkout"
                className="block w-full bg-dark text-cream text-center py-4 text-xs tracking-widest uppercase hover:bg-brown transition-colors"
              >
                Proceed to Checkout
              </Link>
              <Link
                href="/shop"
                className="block w-full text-center py-3 text-[11px] tracking-widest uppercase text-olive hover:text-dark transition-colors mt-3"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
