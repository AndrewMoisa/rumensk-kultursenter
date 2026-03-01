"use client"

import { useState } from "react"
import Image from "next/image"
import { Palette, ShoppingBag, Send } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useTranslations } from "next-intl"
import type { Product } from "../types"

interface ProductGridProps {
  products: Product[]
  onInquire: (product: Product) => void
}

export default function ProductGrid({ products, onInquire }: ProductGridProps) {
  const t = useTranslations("Store")
  const [expandedProducts, setExpandedProducts] = useState<Set<string>>(new Set())

  const toggleExpand = (id: string) => {
    setExpandedProducts((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <ShoppingBag className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" />
        <p className="text-muted-foreground">{t("noProducts")}</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <Card
          key={product.id}
          className="border-border/50 shadow-lg hover:shadow-xl transition-all group overflow-hidden"
        >
          {/* Product Image */}
          <div className="relative aspect-square bg-muted/30 overflow-hidden">
            {product.image_url ? (
              <Image
                src={product.image_url}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Palette className="w-16 h-16 text-muted-foreground/20" />
              </div>
            )}
          </div>

          <CardContent className="p-5">
            <h3 className="font-serif text-lg font-semibold text-primary mb-1">
              {product.name}
            </h3>
            {product.description && (
              <div className="mb-3">
                <p className={`text-sm text-muted-foreground whitespace-pre-line ${!expandedProducts.has(product.id) ? 'line-clamp-2' : ''}`}>
                  {product.description}
                </p>
                {product.description.length > 80 && (
                  <button
                    onClick={() => toggleExpand(product.id)}
                    className="text-xs text-accent hover:text-accent/80 font-medium mt-1 transition-colors"
                  >
                    {expandedProducts.has(product.id) ? t("showLess") : t("readMore")}
                  </button>
                )}
              </div>
            )}
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-accent">
                {product.price} NOK
              </span>
              <Button
                size="sm"
                onClick={() => onInquire(product)}
                className="bg-gradient-to-r from-primary to-primary/90 text-primary-foreground hover:from-primary/90 hover:to-primary/80"
              >
                <Send className="w-3.5 h-3.5 mr-1.5" />
                {t("inquire")}
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
