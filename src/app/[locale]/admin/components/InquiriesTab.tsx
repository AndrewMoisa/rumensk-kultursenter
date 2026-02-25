"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { Trash2, ChevronDown, ChevronUp, MapPin, Phone } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Inquiry } from "../types"

interface InquiriesTabProps {
  inquiries: Inquiry[]
  onDeleteInquiry: (id: string) => void
}

export default function InquiriesTab({ inquiries, onDeleteInquiry }: InquiriesTabProps) {
  const t = useTranslations('Admin')
  const [expandedId, setExpandedId] = useState<string | null>(null)

  return (
    <Card className="border-border/50 shadow-xl">
      <CardContent className="p-4 sm:p-6">
        <h2 className="font-serif text-xl font-semibold text-primary mb-4">
          {t("dashboard.inquiries.title")}
        </h2>

        {inquiries.length === 0 ? (
          <p className="py-8 text-center text-muted-foreground">
            {t("dashboard.inquiries.noInquiries")}
          </p>
        ) : (
          <div className="space-y-3">
            {inquiries.map((inq, index) => {
              const isExpanded = expandedId === inq.id
              return (
                <div
                  key={inq.id}
                  className="border border-border/50 rounded-lg overflow-hidden hover:border-border transition-colors"
                >
                  {/* Header row — always visible */}
                  <div
                    className="flex items-center gap-3 p-3 sm:p-4 cursor-pointer hover:bg-muted/30 transition-colors"
                    onClick={() => setExpandedId(isExpanded ? null : inq.id)}
                  >
                    <span className="text-xs text-muted-foreground w-6 flex-shrink-0">{index + 1}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3">
                        <span className="font-medium text-foreground text-sm">{inq.customer_name}</span>
                        <span className="text-xs text-muted-foreground truncate">{inq.customer_email}</span>
                      </div>
                      <p className="text-xs text-accent mt-0.5">{inq.product_name || '—'}</p>
                    </div>
                    <span className="text-xs text-muted-foreground flex-shrink-0 hidden sm:block">
                      {new Date(inq.created_at).toLocaleDateString()}
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    )}
                  </div>

                  {/* Expanded content */}
                  {isExpanded && (
                    <div className="border-t border-border/50 p-3 sm:p-4 bg-muted/20">
                      <div className="flex flex-col sm:flex-row sm:items-start gap-3">
                        <div className="flex-1 min-w-0 space-y-3">
                          {/* Phone */}
                          {inq.phone && (
                            <div className="flex items-center gap-2">
                              <Phone className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                              <span className="text-sm text-foreground">{inq.phone}</span>
                            </div>
                          )}

                          {/* Delivery Address */}
                          {(inq.address || inq.city || inq.postal_code) && (
                            <div className="flex items-start gap-2">
                              <MapPin className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0 mt-0.5" />
                              <div className="text-sm text-foreground">
                                {inq.address && <p>{inq.address}</p>}
                                {(inq.postal_code || inq.city) && (
                                  <p>{[inq.postal_code, inq.city].filter(Boolean).join(' ')}</p>
                                )}
                              </div>
                            </div>
                          )}

                          {/* Message */}
                          <div>
                            <p className="text-xs font-medium text-muted-foreground mb-1.5">{t("dashboard.inquiries.message")}</p>
                            <p className="text-sm text-foreground whitespace-pre-wrap break-words leading-relaxed">
                              {inq.message || '—'}
                            </p>
                          </div>

                          <p className="text-xs text-muted-foreground mt-2 sm:hidden">
                            {new Date(inq.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => { e.stopPropagation(); onDeleteInquiry(inq.id) }}
                          className="text-destructive hover:text-destructive hover:bg-destructive/10 flex-shrink-0 self-start"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
