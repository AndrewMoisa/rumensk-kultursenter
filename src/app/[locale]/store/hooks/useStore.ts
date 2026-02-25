"use client"

import { useState, useEffect, useCallback } from "react"
import { createClient } from "@/lib/supabase/client"
import type { Product } from "../types"

export function useStore() {
  const [products, setProducts] = useState<Product[]>([])
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [inquirySubmitted, setInquirySubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const supabase = createClient()

  const loadProducts = useCallback(async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false })

    if (!error && data) {
      setProducts(data)
    }
  }, [supabase])

  useEffect(() => {
    loadProducts()
  }, [loadProducts])

  async function handleInquiry(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const message = formData.get("message") as string

    const { error } = await supabase.from("product_inquiries").insert({
      product_id: selectedProduct?.id,
      product_name: selectedProduct?.name,
      customer_name: name,
      customer_email: email,
      message,
    })

    if (!error) {
      setInquirySubmitted(true)
    }

    setIsSubmitting(false)
  }

  function closeModal() {
    setSelectedProduct(null)
    setInquirySubmitted(false)
  }

  return {
    products,
    selectedProduct,
    setSelectedProduct,
    inquirySubmitted,
    isSubmitting,
    handleInquiry,
    closeModal,
  }
}
