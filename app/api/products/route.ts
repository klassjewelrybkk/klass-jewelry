import { NextResponse } from 'next/server'
import { PRODUCTS } from '@/lib/products'

// GET /api/products
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')

  let products = PRODUCTS

  if (category) {
    products = PRODUCTS.filter(p => p.category === category)
  }

  return NextResponse.json({ products, total: products.length })
}
