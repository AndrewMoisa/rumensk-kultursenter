"use client"

import Image from "next/image"
import { Link } from "@/i18n/routing"
import { ShoppingBag, MessageSquare, Mail, Calendar, Users, LogOut, ExternalLink, Home, Store, CalendarDays, UserPlus, Phone } from "lucide-react"
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

      <div className="relative z-10 flex flex-col lg:flex-row min-h-screen">
        {/* Sidebar — desktop */}
        <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 border-r border-border/50 bg-background/80 backdrop-blur-sm">
          {/* Logo + title */}
          <div className="flex items-center gap-3 px-6 py-5 border-b border-border/50">
            <Link href="/">
              <Image
                src="/images/logo/logov2.png"
                alt="RKS Logo"
                width={40}
                height={40}
                className="object-contain"
              />
            </Link>
            <div className="min-w-0">
              <h1 className="font-serif text-lg font-bold text-primary truncate">
                {t("dashboard.heading")}
              </h1>
              <p className="text-xs text-muted-foreground truncate">
                {t("dashboard.description")}
              </p>
            </div>
          </div>

          {/* Nav items */}
          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            {[
              { id: "members" as const, icon: Users, label: t("dashboard.membersList"), count: admin.applications.length },
              { id: "products" as const, icon: ShoppingBag, label: t("dashboard.products.title"), count: admin.products.length },
              { id: "inquiries" as const, icon: MessageSquare, label: t("dashboard.inquiries.title"), count: admin.inquiries.length },
              { id: "contacts" as const, icon: Mail, label: t("dashboard.contacts.title"), count: admin.contacts.length },
              { id: "events" as const, icon: Calendar, label: t("dashboard.events.title"), count: admin.events.length },
            ].map(({ id, icon: Icon, label, count }) => (
              <button
                key={id}
                onClick={() => admin.setActiveTab(id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  admin.activeTab === id
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span className="truncate">{label}</span>
                {count > 0 && (
                  <span className={`ml-auto text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${
                    admin.activeTab === id
                      ? "bg-primary-foreground/20 text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}>
                    {count}
                  </span>
                )}
              </button>
            ))}
          </nav>

          {/* Logout */}
          <div className="px-3 py-4 border-t border-border/50 space-y-1">
            {/* Site links */}
            <p className="px-3 pt-1 pb-2 text-xs font-semibold text-muted-foreground/60 uppercase tracking-wider">
              {t("dashboard.viewSite")}
            </p>
            {[
              { href: "/" as const, icon: Home, label: t("dashboard.siteLinks.home") },
              { href: "/store" as const, icon: Store, label: t("dashboard.siteLinks.store") },
              { href: "/events" as const, icon: CalendarDays, label: t("dashboard.siteLinks.events") },
              { href: "/join" as const, icon: UserPlus, label: t("dashboard.siteLinks.join") },
              { href: "/contact" as const, icon: Phone, label: t("dashboard.siteLinks.contact") },
            ].map(({ href, icon: Icon, label }) => (
              <Link
                key={href}
                href={href}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span className="truncate">{label}</span>
                <ExternalLink className="w-3 h-3 ml-auto flex-shrink-0 opacity-40" />
              </Link>
            ))}

            {/* Logout button */}
            <div className="pt-2 mt-2 border-t border-border/50">
              <button
                onClick={admin.handleLogout}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                {t("dashboard.logout")}
              </button>
            </div>
          </div>
        </aside>

        {/* Mobile top bar */}
        <div className="lg:hidden sticky top-0 z-20 bg-background/95 backdrop-blur-sm border-b border-border/50">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
              <Link href="/">
                <Image
                  src="/images/logo/logov2.png"
                  alt="RKS Logo"
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </Link>
              <h1 className="font-serif text-lg font-bold text-primary">
                {t("dashboard.heading")}
              </h1>
            </div>
            <div className="flex items-center gap-1">
              <Link
                href="/"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                <span className="hidden sm:inline">{t("dashboard.viewSite")}</span>
              </Link>
              <button
                onClick={admin.handleLogout}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">{t("dashboard.logout")}</span>
              </button>
            </div>
          </div>
          <div className="grid grid-cols-5 gap-1 px-2 pb-2">
            {[
              { id: "members" as const, icon: Users, label: t("dashboard.membersList"), count: admin.applications.length },
              { id: "products" as const, icon: ShoppingBag, label: t("dashboard.products.title"), count: admin.products.length },
              { id: "inquiries" as const, icon: MessageSquare, label: t("dashboard.inquiries.title"), count: admin.inquiries.length },
              { id: "contacts" as const, icon: Mail, label: t("dashboard.contacts.title"), count: admin.contacts.length },
              { id: "events" as const, icon: Calendar, label: t("dashboard.events.title"), count: admin.events.length },
            ].map(({ id, icon: Icon, label, count }) => (
              <button
                key={id}
                onClick={() => admin.setActiveTab(id)}
                className={`relative flex flex-col items-center justify-center gap-0.5 py-2 rounded-lg text-xs font-medium transition-colors min-h-[52px] ${
                  admin.activeTab === id
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-[10px] leading-tight truncate max-w-full px-0.5">{label}</span>
                {count > 0 && (
                  <span className={`absolute -top-1 -right-0.5 text-[10px] font-bold min-w-[18px] h-[18px] flex items-center justify-center rounded-full ${
                    admin.activeTab === id
                      ? "bg-primary-foreground text-primary"
                      : "bg-primary/15 text-primary"
                  }`}>
                    {count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Main content area */}
        <div className="flex-1 lg:ml-64">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-8">
              <Card className="border-border/50">
                <CardContent className="p-3 sm:p-6 flex sm:block items-center justify-between">
                  <p className="text-xs sm:text-sm text-muted-foreground">{t("dashboard.totalMembers")}</p>
                  <p className="text-2xl sm:text-3xl font-bold text-primary">{admin.applications.length}</p>
                </CardContent>
              </Card>
              <Card className="border-border/50">
                <CardContent className="p-3 sm:p-6 flex sm:block items-center justify-between">
                  <p className="text-xs sm:text-sm text-muted-foreground">{t("dashboard.thisMonth")}</p>
                  <p className="text-2xl sm:text-3xl font-bold text-accent">{admin.approvedCount}</p>
                </CardContent>
              </Card>
              <Card className="border-border/50">
                <CardContent className="p-3 sm:p-6 flex sm:block items-center justify-between">
                  <p className="text-xs sm:text-sm text-muted-foreground">{t("dashboard.pending")}</p>
                  <p className="text-2xl sm:text-3xl font-bold text-secondary">{admin.pendingCount}</p>
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
        </div>
      </div>
    </main>
  )
}
