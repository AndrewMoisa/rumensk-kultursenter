"use client"

import { useMemo } from "react"
import { useAdmin } from "./hooks/useAdmin"
import type { AdminTab } from "./types"

import AdminLogin from "./components/AdminLogin"
import AdminSidebar from "./components/AdminSidebar"
import AdminMobileHeader from "./components/AdminMobileHeader"
import AdminStatsCards from "./components/AdminStatsCards"
import AdminTabContent from "./components/AdminTabContent"

export default function AdminPage() {
  const admin = useAdmin()

  const tabCounts = useMemo<Record<AdminTab, number>>(() => ({
    members: admin.applications.length,
    products: admin.products.length,
    inquiries: admin.inquiries.length,
    contacts: admin.contacts.length,
    events: admin.events.length,
  }), [admin.applications.length, admin.products.length, admin.inquiries.length, admin.contacts.length, admin.events.length])

  if (!admin.isAuthenticated) {
    return (
      <AdminLogin
        isLoading={admin.isLoading}
        error={admin.error}
        onLogin={admin.handleLogin}
      />
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-blue-50/20 to-background">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row min-h-screen">
        <AdminSidebar
          activeTab={admin.activeTab}
          onTabChange={admin.setActiveTab}
          onLogout={admin.handleLogout}
          counts={tabCounts}
        />

        <AdminMobileHeader
          activeTab={admin.activeTab}
          onTabChange={admin.setActiveTab}
          onLogout={admin.handleLogout}
          counts={tabCounts}
        />

        {/* Main content */}
        <div className="flex-1 lg:ml-64">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
            <AdminStatsCards
              totalMembers={admin.applications.length}
              approvedCount={admin.approvedCount}
              pendingCount={admin.pendingCount}
            />
            <AdminTabContent admin={admin} />
          </div>
        </div>
      </div>
    </main>
  )
}
