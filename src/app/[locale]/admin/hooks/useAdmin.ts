"use client"

import { useState, useEffect, useCallback } from "react"
import { createClient } from "@/lib/supabase/client"
import type { Application, Product, Inquiry, AdminTab } from "../types"

export function useAdmin() {
  const [isLoading, setIsLoading] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [error, setError] = useState("")
  const [applications, setApplications] = useState<Application[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [showAddProduct, setShowAddProduct] = useState(false)
  const [activeTab, setActiveTab] = useState<AdminTab>("members")
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [editFileName, setEditFileName] = useState<string | null>(null)

  const supabase = createClient()

  // --- Data Loading ---

  const loadApplications = useCallback(async () => {
    const { data, error } = await supabase
      .from('membership_applications')
      .select('*')
      .order('created_at', { ascending: false })

    if (!error && data) {
      setApplications(data)
    }
  }, [supabase])

  const loadProducts = useCallback(async () => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })

    if (!error && data) {
      setProducts(data)
    }
  }, [supabase])

  const loadInquiries = useCallback(async () => {
    const { data, error } = await supabase
      .from('product_inquiries')
      .select('*')
      .order('created_at', { ascending: false })

    if (!error && data) {
      setInquiries(data)
    }
  }, [supabase])

  // --- Session ---

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setIsAuthenticated(true)
      }
    })
  }, [supabase])

  useEffect(() => {
    if (isAuthenticated) {
      loadApplications()
      loadProducts()
      loadInquiries()
    }
  }, [isAuthenticated, loadApplications, loadProducts, loadInquiries])

  // --- Auth ---

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (authError) {
      setError("login.error")
    } else {
      setIsAuthenticated(true)
    }

    setIsLoading(false)
  }

  async function handleLogout() {
    await supabase.auth.signOut()
    setIsAuthenticated(false)
    setApplications([])
  }

  // --- Members ---

  const pendingCount = applications.filter(a => a.status === 'pending').length
  const approvedCount = applications.filter(a => a.status === 'approved').length
  const paidCount = applications.filter(a => a.status === 'paid').length

  async function handleStatusChange(id: string, newStatus: string) {
    const { error } = await supabase
      .from('membership_applications')
      .update({ status: newStatus })
      .eq('id', id)

    if (!error) {
      setApplications(prev =>
        prev.map(app => app.id === id ? { ...app, status: newStatus } : app)
      )
    }
  }

  // --- Products ---

  async function handleAddProduct(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const name = formData.get("productName") as string
    const description = (formData.get("productDescription") as string) || null
    const price = parseFloat(formData.get("productPrice") as string)
    const file = formData.get("productImage") as File | null

    let image_url: string | null = null

    if (file && file.size > 0) {
      const fileExt = file.name.split('.').pop()
      const fileName = `${crypto.randomUUID()}.${fileExt}`

      const { error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(fileName, file)

      if (uploadError) {
        console.error('Upload error:', uploadError)
        return
      }

      const { data: urlData } = supabase.storage
        .from('product-images')
        .getPublicUrl(fileName)

      image_url = urlData.publicUrl
    }

    const { error } = await supabase.from('products').insert({
      name,
      description,
      price,
      image_url,
    })

    if (!error) {
      setShowAddProduct(false)
      setSelectedFileName(null)
      loadProducts()
    }
  }

  async function handleEditProduct(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!editingProduct) return

    const formData = new FormData(e.currentTarget)
    const name = formData.get("editName") as string
    const description = (formData.get("editDescription") as string) || null
    const price = parseFloat(formData.get("editPrice") as string)
    const file = formData.get("editImage") as File | null

    let image_url = editingProduct.image_url

    if (file && file.size > 0) {
      const fileExt = file.name.split('.').pop()
      const fileName = `${crypto.randomUUID()}.${fileExt}`

      const { error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(fileName, file)

      if (uploadError) {
        console.error('Upload error:', uploadError)
        return
      }

      const { data: urlData } = supabase.storage
        .from('product-images')
        .getPublicUrl(fileName)

      image_url = urlData.publicUrl
    }

    const { error } = await supabase
      .from('products')
      .update({ name, description, price, image_url })
      .eq('id', editingProduct.id)

    if (!error) {
      setEditingProduct(null)
      setEditFileName(null)
      loadProducts()
    }
  }

  async function handleDeleteProduct(id: string) {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id)

    if (!error) {
      setProducts(prev => prev.filter(p => p.id !== id))
    }
  }

  return {
    // Auth state
    isLoading,
    isAuthenticated,
    error,
    handleLogin,
    handleLogout,

    // Tab state
    activeTab,
    setActiveTab,

    // Members
    applications,
    pendingCount,
    approvedCount,
    paidCount,
    handleStatusChange,

    // Products
    products,
    showAddProduct,
    setShowAddProduct,
    selectedFileName,
    setSelectedFileName,
    editingProduct,
    setEditingProduct,
    editFileName,
    setEditFileName,
    handleAddProduct,
    handleEditProduct,
    handleDeleteProduct,

    // Inquiries
    inquiries,
  }
}
