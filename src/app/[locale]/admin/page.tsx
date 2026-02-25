"use client"

import Image from "next/image"
import { Link } from "@/i18n/routing"
import { ShoppingBag, MessageSquare, Mail, Calendar } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useTranslations } from "next-intl"

import { useAdmin } from "./hooks/useAdmin"
import AdminLogin from "./components/AdminLogin"
import MembersTab from "./components/MembersTab"
import ProductsTab from "./components/ProductsTab"
import InquiriesTab from "./components/InquiriesTab"
import ContactsTab from "./components/ContactsTab"
import EventsTab from "./components/EventsTab"

export default function AdminPage() {
  const t = useTranslations('Admin')
  const admin = useAdmin()

  // Login screen
  if (!admin.isAuthenticated) {
    return (
      <AdminLogin
        isLoading={admin.isLoading}
        error={admin.error}
        onLogin={admin.handleLogin}
      />
    )
  }

  // Admin dashboard
  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-blue-50/20 to-background">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Image
                src="/images/logo/logov2.png"
                alt="RKS Logo"
                width={48}
                height={48}
                className="object-contain"
              />
            </Link>
            <div>
              <h1 className="font-serif text-2xl md:text-3xl font-bold text-primary">
                {t("dashboard.heading")}
              </h1>
              <p className="text-sm text-muted-foreground">
                {t("dashboard.description")}
              </p>
            </div>
          </div>
          <Button variant="outline" onClick={admin.handleLogout}>
            {t("dashboard.logout")}
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <Card className="border-border/50">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">{t("dashboard.totalMembers")}</p>
              <p className="text-3xl font-bold text-primary">{admin.applications.length}</p>
            </CardContent>
          </Card>
          <Card className="border-border/50">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">{t("dashboard.thisMonth")}</p>
              <p className="text-3xl font-bold text-accent">{admin.approvedCount}</p>
            </CardContent>
          </Card>
          <Card className="border-border/50">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">{t("dashboard.pending")}</p>
              <p className="text-3xl font-bold text-secondary">{admin.pendingCount}</p>
            </CardContent>
          </Card>
        </div>

        {/* Loading / Error State */}
        {admin.dataLoading && (
          <Card className="border-border/50 shadow-xl">
            <CardContent className="p-12 text-center">
              <div className="w-8 h-8 border-3 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4" />
              <p className="text-muted-foreground">{t("dashboard.loading")}</p>
            </CardContent>
          </Card>
        )}

        {admin.dataError && (
          <Card className="border-destructive/50 shadow-xl">
            <CardContent className="p-8 text-center">
              <p className="text-destructive font-medium">{admin.dataError}</p>
            </CardContent>
          </Card>
        )}

        {!admin.dataLoading && !admin.dataError && (
        <>
        {/* Tabs */}
        <div className="flex gap-2 mb-8 flex-wrap">
          <Button
            variant={admin.activeTab === "members" ? "default" : "outline"}
            onClick={() => admin.setActiveTab("members")}
            className={admin.activeTab === "members" ? "bg-gradient-to-r from-primary to-primary/90 text-primary-foreground" : ""}
          >
            {t("dashboard.membersList")}
          </Button>
          <Button
            variant={admin.activeTab === "products" ? "default" : "outline"}
            onClick={() => admin.setActiveTab("products")}
            className={admin.activeTab === "products" ? "bg-gradient-to-r from-primary to-primary/90 text-primary-foreground" : ""}
          >
            <ShoppingBag className="w-4 h-4 mr-2" />
            {t("dashboard.products.title")}
          </Button>
          <Button
            variant={admin.activeTab === "inquiries" ? "default" : "outline"}
            onClick={() => admin.setActiveTab("inquiries")}
            className={admin.activeTab === "inquiries" ? "bg-gradient-to-r from-primary to-primary/90 text-primary-foreground" : ""}
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            {t("dashboard.inquiries.title")}
            {admin.inquiries.length > 0 && (
              <span className="ml-2 bg-accent/20 text-accent text-xs font-bold px-1.5 py-0.5 rounded-full">
                {admin.inquiries.length}
              </span>
            )}
          </Button>
          <Button
            variant={admin.activeTab === "contacts" ? "default" : "outline"}
            onClick={() => admin.setActiveTab("contacts")}
            className={admin.activeTab === "contacts" ? "bg-gradient-to-r from-primary to-primary/90 text-primary-foreground" : ""}
          >
            <Mail className="w-4 h-4 mr-2" />
            {t("dashboard.contacts.title")}
            {admin.contacts.length > 0 && (
              <span className="ml-2 bg-accent/20 text-accent text-xs font-bold px-1.5 py-0.5 rounded-full">
                {admin.contacts.length}
              </span>
            )}
          </Button>
          <Button
            variant={admin.activeTab === "events" ? "default" : "outline"}
            onClick={() => admin.setActiveTab("events")}
            className={admin.activeTab === "events" ? "bg-gradient-to-r from-primary to-primary/90 text-primary-foreground" : ""}
          >
            <Calendar className="w-4 h-4 mr-2" />
            {t("dashboard.events.title")}
            {admin.events.length > 0 && (
              <span className="ml-2 bg-accent/20 text-accent text-xs font-bold px-1.5 py-0.5 rounded-full">
                {admin.events.length}
              </span>
            )}
          </Button>
        </div>

        {/* Tab Content */}
        {admin.activeTab === "members" && (
          <MembersTab
            applications={admin.applications}
            onStatusChange={admin.handleStatusChange}
          />
        )}

        {admin.activeTab === "products" && (
          <ProductsTab
            products={admin.products}
            showAddProduct={admin.showAddProduct}
            setShowAddProduct={admin.setShowAddProduct}
            selectedFileName={admin.selectedFileName}
            setSelectedFileName={admin.setSelectedFileName}
            editingProduct={admin.editingProduct}
            setEditingProduct={admin.setEditingProduct}
            editFileName={admin.editFileName}
            setEditFileName={admin.setEditFileName}
            onAddProduct={admin.handleAddProduct}
            onEditProduct={admin.handleEditProduct}
            onDeleteProduct={admin.handleDeleteProduct}
          />
        )}

        {admin.activeTab === "inquiries" && (
          <InquiriesTab inquiries={admin.inquiries} onDeleteInquiry={admin.handleDeleteInquiry} />
        )}

        {admin.activeTab === "contacts" && (
          <ContactsTab contacts={admin.contacts} onDeleteContact={admin.handleDeleteContact} />
        )}

        {admin.activeTab === "events" && (
          <EventsTab
            events={admin.events}
            showAddEvent={admin.showAddEvent}
            setShowAddEvent={admin.setShowAddEvent}
            eventFileName={admin.eventFileName}
            setEventFileName={admin.setEventFileName}
            editingEvent={admin.editingEvent}
            setEditingEvent={admin.setEditingEvent}
            editEventFileName={admin.editEventFileName}
            setEditEventFileName={admin.setEditEventFileName}
            onAddEvent={admin.handleAddEvent}
            onEditEvent={admin.handleEditEvent}
            onDeleteEvent={admin.handleDeleteEvent}
          />
        )}
        </>
        )}
      </div>
    </main>
  )
}
