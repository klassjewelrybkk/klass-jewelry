import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { supabaseAdmin } from '@/lib/supabase'
import Stripe from 'stripe'

// POST /api/webhooks/stripe
export async function POST(request: Request) {
  const body = await request.text()
  const sig = request.headers.get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  const db = supabaseAdmin()

  // Handle events
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session
      const orderId = session.metadata?.order_id

      if (orderId) {
        const { error } = await db
          .from('orders')
          .update({ status: 'paid' })
          .eq('id', orderId)

        if (error) {
          console.error('Failed to update order status:', error)
        } else {
          console.log(`Order ${orderId} marked as paid`)
        }
      }
      break
    }

    case 'payment_intent.payment_failed': {
      // Optionally handle failed payments
      console.log('Payment failed:', event.data.object)
      break
    }
  }

  return NextResponse.json({ received: true })
}
