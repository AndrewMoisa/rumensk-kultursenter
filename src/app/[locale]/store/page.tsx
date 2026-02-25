"use client"

import { Palette } from "lucide-react"
import { useTranslations } from "next-intl"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

import { useStore } from "./hooks/useStore"
import ProductGrid from "./components/ProductGrid"
import InquiryModal from "./components/InquiryModal"

export default function StorePage() {
  const t = useTranslations("Store")
  const store = useStore()

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-blue-50/20 to-background">
      <Header />

      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12 relative z-10">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-accent/10 px-3 py-1 rounded-full mb-4">
            <Palette className="w-4 h-4 text-accent" />
            <span className="text-accent font-medium text-xs uppercase tracking-wider">
              {t("badge")}
            </span>
          </div>

          <h1 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-3">
            {t("heading")}
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("description")}
          </p>
        </div>

        {store.loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden border-border animate-pulse">
                <div className="h-48 bg-muted" />
                <CardContent className="p-4 space-y-3">
                  <Skeleton className="h-5 w-2/3" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-10 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {store.loadError && (
          <Card className="border-destructive/50">
            <CardContent className="p-8 text-center">
              <p className="text-destructive font-medium">{store.loadError}</p>
            </CardContent>
          </Card>
        )}

        {!store.loading && !store.loadError && store.products.length > 0 && (
          <ProductGrid
            products={store.products}
            onInquire={store.setSelectedProduct}
          />
        )}

        {!store.loading && !store.loadError && store.products.length === 0 && (
          <Card className="border-border/50">
            <CardContent className="p-12 text-center">
              <p className="text-muted-foreground">{t("noProducts")}</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Inquiry Modal */}
      {store.selectedProduct && (
        <InquiryModal
          product={store.selectedProduct}
          inquirySubmitted={store.inquirySubmitted}
          isSubmitting={store.isSubmitting}
          inquiryErrors={store.inquiryErrors}
          onSubmit={store.handleInquiry}
          onClose={store.closeModal}
        />
      )}

      <Footer />
    </main>
  )
}
