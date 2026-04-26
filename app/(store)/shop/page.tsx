import { Suspense } from 'react'
import ShopContent from './ShopContent'

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="pt-16 text-center py-20">Loading...</div>}>
      <ShopContent />
    </Suspense>
  )
}
