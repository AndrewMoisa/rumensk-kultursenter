"use client"

import { useState, useEffect, useCallback } from "react"
import { createClient } from "@/lib/supabase/client"
import { inquirySchema } from "@/lib/validations/forms"
import type { Product } from "../types"

export function useStore() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [inquirySubmitted, setInquirySubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [inquiryErrors, setInquiryErrors] = useState<Record<string, string[]>>({})

  const supabase = createClient()

  const loadProducts = useCallback(async () => {
    setLoading(true)
    setLoadError(null)
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      setLoadError("Failed to load products.")
    } else if (data) {
      setProducts(data)
    }
    setLoading(false)
  }, [supabase])

  useEffect(() => {
    loadProducts()
  }, [loadProducts])

  async function handleInquiry(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setInquiryErrors({})

    const formData = new FormData(e.currentTarget)
    const raw = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      message: (formData.get("message") as string) || '',
    }

    const result = inquirySchema.safeParse(raw)

    if (!result.success) {
      const fieldErrors: Record<string, string[]> = {}
      for (const issue of result.error.issues) {
        const field = issue.path[0] as string
        if (!fieldErrors[field]) fieldErrors[field] = []
        fieldErrors[field].push(issue.message)
      }
      setInquiryErrors(fieldErrors)
      return
    }

    setIsSubmitting(true)

    const { error } = await supabase.from("product_inquiries").insert({
      product_id: selectedProduct?.id,
      product_name: selectedProduct?.name,
      customer_name: result.data.name,
      customer_email: result.data.email,
      message: result.data.message || null,
    })

    if (!error) {
      setInquirySubmitted(true)
    }

    setIsSubmitting(false)
  }

  function closeModal() {
    setSelectedProduct(null)
    setInquirySubmitted(false)
    setInquiryErrors({})
  }

  return {
    products,
    loading,
    loadError,
    selectedProduct,
    setSelectedProduct,
    inquirySubmitted,
    isSubmitting,
    inquiryErrors,
    handleInquiry,
    closeModal,
  }
}
