"use client"

import { useState, useEffect, useCallback } from "react"
import { createClient } from "@/lib/supabase/client"
import type { Application, Product, Inquiry, ContactMessage, Event, AdminTab } from "../types"

export function useAdmin() {
  const [isLoading, setIsLoading] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [dataLoading, setDataLoading] = useState(true)
  const [dataError, setDataError] = useState<string | null>(null)
  const [error, setError] = useState("")
  const [applications, setApplications] = useState<Application[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [contacts, setContacts] = useState<ContactMessage[]>([])
  const [events, setEvents] = useState<Event[]>([])
  const [showAddEvent, setShowAddEvent] = useState(false)
  const [editingEvent, setEditingEvent] = useState<Event | null>(null)
  const [eventFileName, setEventFileName] = useState<string | null>(null)
  const [editEventFileName, setEditEventFileName] = useState<string | null>(null)
  const [showAddProduct, setShowAddProduct] = useState(false)
  const [activeTab, setActiveTab] = useState<AdminTab>("members")
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [editFileName, setEditFileName] = useState<string | null>(null)

  // --- Data Loading ---

  const loadApplications = useCallback(async () => {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('membership_applications')
      .select('*')
      .order('created_at', { ascending: false })

    if (!error && data) {
      setApplications(data)
    }
  }, [])

  const loadProducts = useCallback(async () => {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })

    if (!error && data) {
      setProducts(data)
    }
  }, [])

  const loadInquiries = useCallback(async () => {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('product_inquiries')
      .select('*')
      .order('created_at', { ascending: false })

    if (!error && data) {
      setInquiries(data)
    }
  }, [])

  const loadContacts = useCallback(async () => {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false })

    if (!error && data) {
      setContacts(data)
    }
  }, [])

  const loadEvents = useCallback(async () => {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('created_at', { ascending: false })

    if (!error && data) {
      setEvents(data)
    }
  }, [])

  // --- Session ---

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setIsAuthenticated(true)
      }
    })
  }, [])

  useEffect(() => {
    if (isAuthenticated) {
      setDataLoading(true)
      setDataError(null)
      Promise.all([
        loadApplications(),
        loadProducts(),
        loadInquiries(),
        loadContacts(),
        loadEvents(),
      ])
        .catch(() => setDataError('Failed to load data. Please refresh.'))
        .finally(() => setDataLoading(false))
    }
  }, [isAuthenticated, loadApplications, loadProducts, loadInquiries, loadContacts, loadEvents])

  // --- Auth ---

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    const supabase = createClient()
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
    const supabase = createClient()
    await supabase.auth.signOut()
    setIsAuthenticated(false)
    setApplications([])
  }

  // --- Members ---

  const pendingCount = applications.filter(a => a.status === 'pending').length
  const approvedCount = applications.filter(a => a.status === 'approved').length
  const paidCount = applications.filter(a => a.status === 'paid').length

  async function handleStatusChange(id: string, newStatus: string) {
    const supabase = createClient()
    const { error } = await supabase
      .from('membership_applications')
      .update({ status: newStatus })
      .eq('id', id)

    if (error) {
      console.error('Status update error:', error)
      setDataError(`Failed to update status: ${error.message}`)
      return
    }

    setDataError(null)
    setApplications(prev =>
      prev.map(app => app.id === id ? { ...app, status: newStatus } : app)
    )
  }

  // --- Products ---

  async function handleAddProduct(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const name = formData.get("productName") as string
    const description = (formData.get("productDescription") as string) || null
    const price = parseFloat(formData.get("productPrice") as string)
    const file = formData.get("productImage") as File | null

    const supabase = createClient()
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

    const supabase = createClient()
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
    const supabase = createClient()
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id)

    if (!error) {
      setProducts(prev => prev.filter(p => p.id !== id))
    }
  }

  // --- Events ---

  async function handleAddEvent(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const title = formData.get("eventTitle") as string
    const description = (formData.get("eventDescription") as string) || null
    const day = (formData.get("eventDay") as string) || null
    const date = (formData.get("eventDate") as string) || null
    const time = (formData.get("eventTime") as string) || null
    const file = formData.get("eventImage") as File | null

    const supabase = createClient()
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

    const { error } = await supabase.from('events').insert({
      title,
      description,
      day,
      date,
      time,
      image_url,
    })

    if (!error) {
      setShowAddEvent(false)
      setEventFileName(null)
      loadEvents()
    }
  }

  async function handleEditEvent(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!editingEvent) return

    const formData = new FormData(e.currentTarget)
    const title = formData.get("editTitle") as string
    const description = (formData.get("editDescription") as string) || null
    const day = (formData.get("editDay") as string) || null
    const date = (formData.get("editDate") as string) || null
    const time = (formData.get("editTime") as string) || null
    const file = formData.get("editImage") as File | null

    const supabase = createClient()
    let image_url = editingEvent.image_url

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
      .from('events')
      .update({ title, description, day, date, time, image_url })
      .eq('id', editingEvent.id)

    if (!error) {
      setEditingEvent(null)
      setEditEventFileName(null)
      loadEvents()
    }
  }

  async function handleDeleteEvent(id: string) {
    const supabase = createClient()
    const { error } = await supabase
      .from('events')
      .delete()
      .eq('id', id)

    if (!error) {
      setEvents(prev => prev.filter(e => e.id !== id))
    }
  }

  async function handleDeleteContact(id: string) {
    const supabase = createClient()
    const { error } = await supabase
      .from('contact_messages')
      .delete()
      .eq('id', id)

    if (!error) {
      setContacts(prev => prev.filter(c => c.id !== id))
    }
  }

  async function handleDeleteInquiry(id: string) {
    const supabase = createClient()
    const { error } = await supabase
      .from('product_inquiries')
      .delete()
      .eq('id', id)

    if (!error) {
      setInquiries(prev => prev.filter(i => i.id !== id))
    }
  }

  return {
    // Auth state
    isLoading,
    isAuthenticated,
    error,
    handleLogin,
    handleLogout,

    // Data loading state
    dataLoading,
    dataError,

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
    handleDeleteInquiry,

    // Contacts
    contacts,
    handleDeleteContact,

    // Events
    events,
    showAddEvent,
    setShowAddEvent,
    editingEvent,
    setEditingEvent,
    eventFileName,
    setEventFileName,
    editEventFileName,
    setEditEventFileName,
    handleAddEvent,
    handleEditEvent,
    handleDeleteEvent,
  }
}
