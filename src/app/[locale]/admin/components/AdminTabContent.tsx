"use client"

import { useTranslations } from "next-intl"
import { Card, CardContent } from "@/components/ui/card"
import type { useAdmin } from "../hooks/useAdmin"

import MembersTab from "./MembersTab"
import ProductsTab from "./ProductsTab"
import InquiriesTab from "./InquiriesTab"
import ContactsTab from "./ContactsTab"
import EventsTab from "./EventsTab"

type AdminState = ReturnType<typeof useAdmin>

interface AdminTabContentProps {
  admin: AdminState
}

export default function AdminTabContent({ admin }: AdminTabContentProps) {
  const t = useTranslations("Admin")

  if (admin.dataLoading) {
    return (
      <Card className="border-border/50 shadow-xl">
        <CardContent className="p-12 text-center">
          <div className="w-8 h-8 border-3 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">{t("dashboard.loading")}</p>
        </CardContent>
      </Card>
    )
  }

  if (admin.dataError) {
    return (
      <Card className="border-destructive/50 shadow-xl">
        <CardContent className="p-8 text-center">
          <p className="text-destructive font-medium">{admin.dataError}</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
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
  )
}
