import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

// PATCH /api/orders/:id — update order status
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { status } = await request.json()

    const validStatuses = ['pending', 'paid', 'shipped']
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 })
    }

    const db = supabaseAdmin()
    const { data, error } = await db
      .from('orders')
      .update({ status })
      .eq('id', params.id)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ order: data })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// GET /api/orders/:id — get single order
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const db = supabaseAdmin()
    const { data, error } = await db
      .from('orders')
      .select(`*, order_items(*)`)
      .eq('id', params.id)
      .single()

    if (error) throw error

    return NextResponse.json({ order: data })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
