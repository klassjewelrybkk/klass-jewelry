import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { supabaseAdmin } from '@/lib/supabase'

// POST /api/checkout
export async function POST(request: Request) {
  try {
    const { items, customerInfo, total } = await request.json()

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'No items in cart' }, { status: 400 })
    }

    // 1. Create order in Supabase (status: pending)
    const db = supabaseAdmin()
    const { data: order, error: orderError } = await db
      .from('orders')
      .insert({
        customer_name: customerInfo.name,
        email: customerInfo.email,
        address: `${customerInfo.address}, ${customerInfo.city} ${customerInfo.zip}, ${customerInfo.country}`,
        total_price: total,
        status: 'pending',
      })
      .select()
      .single()

    if (orderError) throw orderError

    // 2. Insert order items
    await db.from('order_items').insert(
      items.map((item: any) => ({
        order_id: order.id,
        product_id: item.id,
        quantity: item.quantity,
        price_at_purchase: item.price,
      }))
    )

    // 3. Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer_email: customerInfo.email,
      line_items: items.map((item: any) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
            description: `Klass Jewelry - ${item.name}`,
          },
          unit_amount: Math.round(item.price * 100), // cents
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/cart`,
      metadata: {
        order_id: order.id,
      },
    })

    // 4. Save stripe session ID to order
    await db
      .from('orders')
      .update({ stripe_session_id: session.id })
      .eq('id', order.id)

    return NextResponse.json({ url: session.url })
  } catch (error: any) {
    console.error('Checkout error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
