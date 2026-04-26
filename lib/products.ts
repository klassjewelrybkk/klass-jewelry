export type Product = {
  id: number
  name: string
  price: number
  category: 'Rings' | 'Necklaces' | 'Earrings' | 'Bracelets'
  emoji: string
  description: string
  tags: string[]
  bestseller: boolean
  isNew: boolean
  images: string[]
}

export type CartItem = Product & { qty: number }

export type Order = {
  id: string
  customer_name: string
  email: string
  address: string
  total_price: number
  status: 'pending' | 'paid' | 'shipped'
  created_at: string
  items?: OrderItem[]
}

export type OrderItem = {
  id: string
  order_id: string
  product_id: number
  quantity: number
  price_at_purchase: number
  product_name?: string
}

// Static product data (replace with Supabase query in production)
export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Soleil Ring',
    price: 85,
    category: 'Rings',
    emoji: '💍',
    description: 'A delicate gold band with a subtle texture that catches the light beautifully. Perfect for everyday wear, this ring stacks effortlessly with other pieces or shines on its own.',
    tags: ['14k Gold', 'Handcrafted', 'Stackable'],
    bestseller: true,
    isNew: false,
    images: ['/products/ring-1.jpg'],
  },
  {
    id: 2,
    name: 'Luna Pendant',
    price: 120,
    category: 'Necklaces',
    emoji: '🌙',
    description: 'An elegant crescent moon pendant on a fine gold chain. Inspired by the quiet beauty of the night sky, this piece adds a touch of magic to any outfit.',
    tags: ['Sterling Silver', '18" Chain', 'Adjustable'],
    bestseller: true,
    isNew: true,
    images: ['/products/necklace-1.jpg'],
  },
  {
    id: 3,
    name: 'Petal Earrings',
    price: 65,
    category: 'Earrings',
    emoji: '🌸',
    description: 'Lightweight drop earrings with a delicate floral motif. These move gracefully with you throughout your day, catching the light with every turn.',
    tags: ['Gold Vermeil', 'Hypoallergenic', 'Drop Style'],
    bestseller: false,
    isNew: true,
    images: ['/products/earring-1.jpg'],
  },
  {
    id: 4,
    name: 'Arc Cuff',
    price: 145,
    category: 'Bracelets',
    emoji: '✦',
    description: 'A bold but refined open cuff bracelet. The architectural shape is both modern and timeless — a piece that becomes more beautiful with age.',
    tags: ['Sterling Silver', 'Adjustable', 'Minimalist'],
    bestseller: true,
    isNew: false,
    images: ['/products/bracelet-1.jpg'],
  },
  {
    id: 5,
    name: 'Muse Ring',
    price: 95,
    category: 'Rings',
    emoji: '✨',
    description: 'A thin twisted gold band that stacks beautifully with other rings or stands elegantly alone. The twisted design catches the light from every angle.',
    tags: ['14k Gold', 'Twisted Design', 'Stackable'],
    bestseller: false,
    isNew: true,
    images: ['/products/ring-2.jpg'],
  },
  {
    id: 6,
    name: 'Halo Necklace',
    price: 155,
    category: 'Necklaces',
    emoji: '⭕',
    description: 'A fine chain with a small circular pendant. Understated elegance at its finest. The perfect daily companion that goes from morning coffee to evening dinner.',
    tags: ['Gold Vermeil', '16" Chain', 'Minimalist'],
    bestseller: true,
    isNew: false,
    images: ['/products/necklace-2.jpg'],
  },
  {
    id: 7,
    name: 'Marquise Drops',
    price: 88,
    category: 'Earrings',
    emoji: '💎',
    description: 'Elongated marquise-shaped drops that add a touch of refinement to any outfit. Light as a whisper, these earrings are designed for all-day wear.',
    tags: ['Cubic Zirconia', 'Gold Plated', 'Dangle'],
    bestseller: false,
    isNew: true,
    images: ['/products/earring-2.jpg'],
  },
  {
    id: 8,
    name: 'Eternity Band',
    price: 110,
    category: 'Rings',
    emoji: '💫',
    description: 'A classic eternity band set with delicate stones around the full circumference. A symbol of endless elegance, perfect as a standalone piece or stacked.',
    tags: ['CZ Stones', 'Gold Filled', 'Classic'],
    bestseller: true,
    isNew: false,
    images: ['/products/ring-3.jpg'],
  },
  {
    id: 9,
    name: 'Vine Bracelet',
    price: 75,
    category: 'Bracelets',
    emoji: '🌿',
    description: 'A slender chain bracelet with tiny leaf charms distributed along its length. Nature-inspired and utterly wearable, every day.',
    tags: ['Sterling Silver', 'Nature-Inspired', 'Delicate'],
    bestseller: false,
    isNew: false,
    images: ['/products/bracelet-2.jpg'],
  },
  {
    id: 10,
    name: 'Orb Studs',
    price: 55,
    category: 'Earrings',
    emoji: '●',
    description: 'Simple, perfectly round stud earrings. A wardrobe essential for the minimalist. These are the earrings you reach for every single morning.',
    tags: ['Gold Vermeil', 'Stud Style', 'Everyday'],
    bestseller: false,
    isNew: false,
    images: ['/products/earring-3.jpg'],
  },
  {
    id: 11,
    name: 'Cascade Necklace',
    price: 135,
    category: 'Necklaces',
    emoji: '〰',
    description: 'Layered chains of varying lengths for an effortlessly styled look. No need to layer yourself — it arrives already perfectly arranged.',
    tags: ['Multi-chain', 'Gold Filled', 'Layered'],
    bestseller: false,
    isNew: true,
    images: ['/products/necklace-3.jpg'],
  },
  {
    id: 12,
    name: 'Apex Ring',
    price: 165,
    category: 'Rings',
    emoji: '▲',
    description: 'A sculptural ring with a geometric peak. A statement piece that speaks volumes without saying a word. For those who wear art.',
    tags: ['Sterling Silver', 'Statement', 'Geometric'],
    bestseller: false,
    isNew: false,
    images: ['/products/ring-4.jpg'],
  },
]
