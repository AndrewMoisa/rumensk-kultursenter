"use client"

import { useTranslations } from "next-intl"
import { Plus, Trash2, Upload, Pencil, Check, X } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { Product } from "../types"

interface ProductsTabProps {
  products: Product[]
  showAddProduct: boolean
  setShowAddProduct: (show: boolean) => void
  selectedFileName: string | null
  setSelectedFileName: (name: string | null) => void
  editingProduct: Product | null
  setEditingProduct: (product: Product | null) => void
  editFileName: string | null
  setEditFileName: (name: string | null) => void
  onAddProduct: (e: React.FormEvent<HTMLFormElement>) => void
  onEditProduct: (e: React.FormEvent<HTMLFormElement>) => void
  onDeleteProduct: (id: string) => void
}

export default function ProductsTab({
  products,
  showAddProduct,
  setShowAddProduct,
  selectedFileName,
  setSelectedFileName,
  editingProduct,
  setEditingProduct,
  editFileName,
  setEditFileName,
  onAddProduct,
  onEditProduct,
  onDeleteProduct,
}: ProductsTabProps) {
  const t = useTranslations('Admin')

  return (
    <Card className="border-border/50 shadow-xl">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-serif text-xl font-semibold text-primary">
            {t("dashboard.products.title")}
          </h2>
          <Button
            size="sm"
            onClick={() => setShowAddProduct(!showAddProduct)}
            className="bg-gradient-to-r from-primary to-primary/90 text-primary-foreground hover:from-primary/90 hover:to-primary/80"
          >
            <Plus className="w-4 h-4 mr-1.5" />
            {t("dashboard.products.add")}
          </Button>
        </div>

        {/* Add Product Form */}
        {showAddProduct && (
          <form onSubmit={onAddProduct} className="border border-border rounded-lg p-4 mb-6 space-y-3 bg-muted/30">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-sm font-medium">{t("dashboard.products.name")}</label>
                <Input name="productName" required placeholder={t("dashboard.products.namePlaceholder")} className="h-10" />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium">{t("dashboard.products.price")}</label>
                <Input name="productPrice" type="number" step="0.01" min="0" required placeholder="0.00" className="h-10" />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">{t("dashboard.products.description")}</label>
              <textarea
                name="productDescription"
                rows={2}
                placeholder={t("dashboard.products.descriptionPlaceholder")}
                className="flex w-full rounded-md border border-border bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent resize-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">{t("dashboard.products.image")}</label>
              <div className="flex items-center gap-2">
                <label className="flex items-center gap-2 px-3 py-2 rounded-md border border-border bg-background text-sm cursor-pointer hover:bg-muted transition-colors">
                  <Upload className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    {selectedFileName || t("dashboard.products.chooseFile")}
                  </span>
                  <input
                    name="productImage"
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    onChange={(e) => setSelectedFileName(e.target.files?.[0]?.name || null)}
                  />
                </label>
                {selectedFileName && (
                  <Check className="w-4 h-4 text-green-600" />
                )}
              </div>
            </div>
            <div className="flex gap-2">
              <Button type="submit" size="sm">{t("dashboard.products.save")}</Button>
              <Button type="button" variant="outline" size="sm" onClick={() => setShowAddProduct(false)}>{t("dashboard.products.cancel")}</Button>
            </div>
          </form>
        )}

        {/* Products List */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground">#</th>
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground">{t("dashboard.products.name")}</th>
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground">{t("dashboard.products.price")}</th>
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground">{t("dashboard.products.description")}</th>
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground">{t("dashboard.products.actions")}</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                editingProduct?.id === product.id ? (
                  <tr key={product.id} className="border-b border-border/50 bg-muted/30">
                    <td colSpan={5} className="py-3 px-4">
                      <form onSubmit={onEditProduct} className="space-y-3">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div className="space-y-1">
                            <label className="text-xs font-medium">{t("dashboard.products.name")}</label>
                            <Input name="editName" defaultValue={product.name} required className="h-9" />
                          </div>
                          <div className="space-y-1">
                            <label className="text-xs font-medium">{t("dashboard.products.price")}</label>
                            <Input name="editPrice" type="number" step="0.01" min="0" defaultValue={product.price} required className="h-9" />
                          </div>
                          <div className="space-y-1">
                            <label className="text-xs font-medium">{t("dashboard.products.image")}</label>
                            <label className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-border bg-background text-sm cursor-pointer hover:bg-muted transition-colors">
                              <Upload className="w-3.5 h-3.5 text-muted-foreground" />
                              <span className="text-muted-foreground text-xs truncate">
                                {editFileName || (product.image_url ? t("dashboard.products.changeImage") : t("dashboard.products.chooseFile"))}
                              </span>
                              <input name="editImage" type="file" accept="image/*" className="sr-only" onChange={(e) => setEditFileName(e.target.files?.[0]?.name || null)} />
                            </label>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-medium">{t("dashboard.products.description")}</label>
                          <textarea
                            name="editDescription"
                            rows={2}
                            defaultValue={product.description || ''}
                            className="flex w-full rounded-md border border-border bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent resize-none"
                          />
                        </div>
                        <div className="flex gap-2">
                          <Button type="submit" size="sm">
                            <Check className="w-3.5 h-3.5 mr-1" />
                            {t("dashboard.products.save")}
                          </Button>
                          <Button type="button" variant="outline" size="sm" onClick={() => { setEditingProduct(null); setEditFileName(null); }}>
                            <X className="w-3.5 h-3.5 mr-1" />
                            {t("dashboard.products.cancel")}
                          </Button>
                        </div>
                      </form>
                    </td>
                  </tr>
                ) : (
                <tr key={product.id} className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                  <td className="py-3 px-4 text-muted-foreground">{index + 1}</td>
                  <td className="py-3 px-4 font-medium text-foreground">{product.name}</td>
                  <td className="py-3 px-4 text-accent font-semibold">{product.price} NOK</td>
                  <td className="py-3 px-4 text-muted-foreground max-w-xs truncate">{product.description || '—'}</td>
                  <td className="py-3 px-4">
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setEditingProduct(product)}
                        className="text-primary hover:text-primary hover:bg-primary/10"
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDeleteProduct(product.id)}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
                )
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-muted-foreground">
                    {t("dashboard.products.noProducts")}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
