export interface Application {
  id: string
  first_name: string
  last_name: string
  email: string
  phone: string | null
  message: string | null
  status: string
  created_at: string
}

export interface Product {
  id: string
  name: string
  description: string | null
  price: number
  image_url: string | null
  created_at: string
}

export interface Inquiry {
  id: string
  product_name: string | null
  customer_name: string
  customer_email: string
  message: string | null
  created_at: string
}

export type AdminTab = "members" | "products" | "inquiries"
