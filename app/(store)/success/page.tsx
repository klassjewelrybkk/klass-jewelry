'use client'

import { useEffect } from 'react'
import { useCart } from '@/lib/cart-context'
import Link from 'next/link'

export default function SuccessPage() {
  const { clearCart } = useCart()

  useEffect(() => {
    clearCart()
  }, [])

  const orderNum = Math.floor(10000 + Math.random() * 90000)

  return (
    <div className="pt-16 min-h-screen flex items-center justify-center bg-beige">
      <div className="text-center max-w-lg px-6 py-20">
        {/* Check circle */}
        <div className="w-16 h-16 border-2 border-brown rounded-full flex items-center justify-center mx-auto mb-8">
          <span className="text-brown text-2xl">✓</span>
        </div>

        <h1 className="font-serif text-4xl font-light text-dark mb-4">Order Confirmed!</h1>
        <p className="text-olive text-sm leading-loose mb-4">
          Thank you for your purchase. Your jewelry is being carefully packaged and will be on its way soon. You will receive a confirmation email shortly.
        </p>
        <p className="text-[11px] tracking-widest uppercase text-brown mb-10">
          Order #KL-{orderNum}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/shop"
            className="inline-block bg-dark text-cream px-8 py-4 text-xs tracking-widest uppercase hover:bg-brown transition-colors"
          >
            Continue Shopping
          </Link>
          <Link
            href="/admin"
            className="inline-block border border-dark text-dark px-8 py-4 text-xs tracking-widest uppercase hover:bg-dark hover:text-cream transition-all"
          >
            View in Admin
          </Link>
        </div>
      </div>
    </div>
  )
}
