"use client"

import { Send, X } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useTranslations } from "next-intl"
import type { Product } from "../types"

interface InquiryModalProps {
  product: Product
  inquirySubmitted: boolean
  isSubmitting: boolean
  inquiryErrors: Record<string, string[]>
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  onClose: () => void
}

export default function InquiryModal({
  product,
  inquirySubmitted,
  isSubmitting,
  inquiryErrors,
  onSubmit,
  onClose,
}: InquiryModalProps) {
  const t = useTranslations("Store")

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <Card className="w-full max-w-md border-border/50 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-full hover:bg-muted transition-colors z-10"
        >
          <X className="w-5 h-5 text-muted-foreground" />
        </button>

        <CardContent className="p-6">
          {inquirySubmitted ? (
            <div className="text-center py-6">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Send className="w-7 h-7 text-green-600" />
              </div>
              <h3 className="font-serif text-xl font-bold text-primary mb-2">
                {t("inquiry.successHeading")}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t("inquiry.successDescription")}
              </p>
              <Button variant="outline" onClick={onClose}>
                {t("inquiry.close")}
              </Button>
            </div>
          ) : (
            <>
              <h3 className="font-serif text-xl font-bold text-primary mb-1">
                {t("inquiry.heading")}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {product.name} — {product.price} NOK
              </p>

              <form onSubmit={onSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="inquiry-name" className="text-sm font-medium text-foreground">
                    {t("inquiry.name")}
                  </label>
                  <Input
                    id="inquiry-name"
                    name="name"
                    type="text"
                    placeholder={t("inquiry.namePlaceholder")}
                    required
                    className={`h-11 border-border focus-visible:ring-accent ${inquiryErrors?.name ? 'border-destructive' : ''}`}
                  />
                  {inquiryErrors?.name && (
                    <p className="text-xs text-destructive">{inquiryErrors.name[0]}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="inquiry-email" className="text-sm font-medium text-foreground">
                    {t("inquiry.email")}
                  </label>
                  <Input
                    id="inquiry-email"
                    name="email"
                    type="email"
                    placeholder={t("inquiry.emailPlaceholder")}
                    required
                    className={`h-11 border-border focus-visible:ring-accent ${inquiryErrors?.email ? 'border-destructive' : ''}`}
                  />
                  {inquiryErrors?.email && (
                    <p className="text-xs text-destructive">{inquiryErrors.email[0]}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="inquiry-phone" className="text-sm font-medium text-foreground">
                    {t("inquiry.phone")}
                  </label>
                  <Input
                    id="inquiry-phone"
                    name="phone"
                    type="tel"
                    placeholder={t("inquiry.phonePlaceholder")}
                    className={`h-11 border-border focus-visible:ring-accent ${inquiryErrors?.phone ? 'border-destructive' : ''}`}
                  />
                  {inquiryErrors?.phone && (
                    <p className="text-xs text-destructive">{inquiryErrors.phone[0]}</p>
                  )}
                </div>

                {/* Delivery Address Section */}
                <div className="border-t border-border/50 pt-4">
                  <p className="text-sm font-semibold text-foreground mb-3">{t("inquiry.deliveryHeading")}</p>

                  <div className="space-y-3">
                    <div className="space-y-2">
                      <label htmlFor="inquiry-address" className="text-sm font-medium text-foreground">
                        {t("inquiry.address")}
                      </label>
                      <Input
                        id="inquiry-address"
                        name="address"
                        type="text"
                        placeholder={t("inquiry.addressPlaceholder")}
                        required
                        className={`h-11 border-border focus-visible:ring-accent ${inquiryErrors?.address ? 'border-destructive' : ''}`}
                      />
                      {inquiryErrors?.address && (
                        <p className="text-xs text-destructive">{inquiryErrors.address[0]}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <label htmlFor="inquiry-postal" className="text-sm font-medium text-foreground">
                          {t("inquiry.postalCode")}
                        </label>
                        <Input
                          id="inquiry-postal"
                          name="postalCode"
                          type="text"
                          placeholder={t("inquiry.postalCodePlaceholder")}
                          required
                          className={`h-11 border-border focus-visible:ring-accent ${inquiryErrors?.postalCode ? 'border-destructive' : ''}`}
                        />
                        {inquiryErrors?.postalCode && (
                          <p className="text-xs text-destructive">{inquiryErrors.postalCode[0]}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="inquiry-city" className="text-sm font-medium text-foreground">
                          {t("inquiry.city")}
                        </label>
                        <Input
                          id="inquiry-city"
                          name="city"
                          type="text"
                          placeholder={t("inquiry.cityPlaceholder")}
                          required
                          className={`h-11 border-border focus-visible:ring-accent ${inquiryErrors?.city ? 'border-destructive' : ''}`}
                        />
                        {inquiryErrors?.city && (
                          <p className="text-xs text-destructive">{inquiryErrors.city[0]}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="inquiry-message" className="text-sm font-medium text-foreground">
                    {t("inquiry.message")}
                  </label>
                  <textarea
                    id="inquiry-message"
                    name="message"
                    placeholder={t("inquiry.messagePlaceholder")}
                    rows={3}
                    className={`flex w-full rounded-md border border-border bg-transparent px-3 py-2 text-base md:text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent resize-none ${inquiryErrors?.message ? 'border-destructive' : ''}`}
                  />
                  {inquiryErrors?.message && (
                    <p className="text-xs text-destructive">{inquiryErrors.message[0]}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-11 bg-gradient-to-r from-primary to-primary/90 text-primary-foreground hover:from-primary/90 hover:to-primary/80 shadow-md hover:shadow-lg transition-all"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      {t("inquiry.loading")}
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="w-4 h-4" />
                      {t("inquiry.send")}
                    </span>
                  )}
                </Button>
              </form>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
