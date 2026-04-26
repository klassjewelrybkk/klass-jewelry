'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

type OrderItem = { name: string; qty: number; price: number; emoji: string }
type Order = {
  id: string
  customer: string
  email: string
  address: string
  items: OrderItem[]
  total: number
  status: 'pending' | 'paid' | 'shipped'
  date: string
}

// Demo orders for display — in production these come from Supabase
const DEMO_ORDERS: Order[] = [
  {
    id: 'KL-48291',
    customer: 'Sophia Laurent',
    email: 'sophia@example.com',
    address: '42 Rue de Rivoli, Paris',
    items: [{ name: 'Soleil Ring', qty: 2, price: 85, emoji: '💍' }, { name: 'Halo Necklace', qty: 1, price: 155, emoji: '⭕' }],
    total: 325,
    status: 'shipped',
    date: 'Apr 2, 2025',
  },
  {
    id: 'KL-48290',
    customer: 'Mia Chen',
    email: 'mia.chen@example.com',
    address: '88 Orchard Rd, Singapore',
    items: [{ name: 'Petal Earrings', qty: 1, price: 65, emoji: '🌸' }],
    total: 65,
    status: 'paid',
    date: 'Apr 1, 2025',
  },
  {
    id: 'KL-48289',
    customer: 'Elena Ross',
    email: 'elena@example.com',
    address: '10 Mayfair Pl, London',
    items: [{ name: 'Arc Cuff', qty: 1, price: 145, emoji: '✦' }, { name: 'Luna Pendant', qty: 1, price: 120, emoji: '🌙' }],
    total: 265,
    status: 'pending',
    date: 'Mar 30, 2025',
  },
]

const STATUS_STYLES = {
  pending: 'bg-amber-50 text-amber-800 border-amber-200',
  paid: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  shipped: 'bg-blue-50 text-blue-800 border-blue-200',
}

export default function AdminPage() {
  const [orders, setOrders] = useState<Order[]>(DEMO_ORDERS)

  const stats = {
    total: orders.length,
    revenue: orders.reduce((s, o) => s + o.total, 0),
    pending: orders.filter(o => o.status === 'pending').length,
    shipped: orders.filter(o => o.status === 'shipped').length,
  }

  const updateStatus = async (id: string, status: Order['status']) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o))
    // In production: await fetch(`/api/orders/${id}`, { method: 'PATCH', body: JSON.stringify({ status }) })
  }

  return (
    <div className="min-h-screen bg-[#F8F7F5]">
      {/* Admin Nav */}
      <div className="bg-dark text-cream px-6 h-14 flex items-center justify-between">
        <h1 className="font-serif text-xl font-light tracking-widest">Klass Admin</h1>
        <Link href="/" className="text-[11px] tracking-widest uppercase text-cream/60 hover:text-cream transition-colors">
          ← Back to Store
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: 'Total Orders', value: stats.total },
            { label: 'Total Revenue', value: `$${stats.revenue.toLocaleString()}` },
            { label: 'Pending', value: stats.pending },
            { label: 'Shipped', value: stats.shipped },
          ].map(s => (
            <div key={s.label} className="bg-white border border-gray-100 p-6">
              <p className="font-serif text-3xl font-light text-dark mb-1">{s.value}</p>
              <p className="text-[11px] tracking-widest uppercase text-olive">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Orders Table */}
        <div className="bg-white border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-serif text-xl font-light text-dark">All Orders</h2>
            <span className="text-[11px] tracking-widest uppercase text-olive">{orders.length} orders</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#F8F7F5] border-b border-gray-100">
                  {['Order', 'Customer', 'Email', 'Items', 'Total', 'Date', 'Status'].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-[11px] tracking-widest uppercase text-olive font-normal">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="px-4 py-4 font-serif text-dark font-medium">{order.id}</td>
                    <td className="px-4 py-4 text-sm text-dark">{order.customer}</td>
                    <td className="px-4 py-4 text-sm text-olive">{order.email}</td>
                    <td className="px-4 py-4 text-sm text-dark max-w-xs">
                      {order.items.map(i => (
                        <span key={i.name} className="inline-block mr-2">
                          {i.emoji} {i.name} ×{i.qty}
                        </span>
                      ))}
                    </td>
                    <td className="px-4 py-4 text-sm font-medium text-dark">${order.total}</td>
                    <td className="px-4 py-4 text-sm text-olive whitespace-nowrap">{order.date}</td>
                    <td className="px-4 py-4">
                      <select
                        value={order.status}
                        onChange={e => updateStatus(order.id, e.target.value as Order['status'])}
                        className={`text-[11px] tracking-wider uppercase px-3 py-1.5 border outline-none cursor-pointer font-sans ${STATUS_STYLES[order.status]}`}
                      >
                        <option value="pending">Pending</option>
                        <option value="paid">Paid</option>
                        <option value="shipped">Shipped</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick API Guide */}
        <div className="mt-8 bg-dark text-cream p-6">
          <h3 className="font-serif text-lg font-light mb-4">API Endpoints</h3>
          <div className="space-y-2 font-mono text-sm text-cream/70">
            <p><span className="text-green-400">GET</span>  /api/products</p>
            <p><span className="text-green-400">GET</span>  /api/products/:id</p>
            <p><span className="text-yellow-400">POST</span> /api/checkout</p>
            <p><span className="text-green-400">GET</span>  /api/orders</p>
            <p><span className="text-blue-400">PATCH</span> /api/orders/:id</p>
            <p><span className="text-yellow-400">POST</span> /api/webhooks/stripe</p>
          </div>
        </div>
      </div>
    </div>
  )
}
