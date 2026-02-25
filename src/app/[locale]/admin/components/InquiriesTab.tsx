"use client"

import { useTranslations } from "next-intl"
import { Card, CardContent } from "@/components/ui/card"
import type { Inquiry } from "../types"

interface InquiriesTabProps {
  inquiries: Inquiry[]
}

export default function InquiriesTab({ inquiries }: InquiriesTabProps) {
  const t = useTranslations('Admin')

  return (
    <Card className="border-border/50 shadow-xl">
      <CardContent className="p-6">
        <h2 className="font-serif text-xl font-semibold text-primary mb-4">
          {t("dashboard.inquiries.title")}
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground">#</th>
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground">{t("dashboard.inquiries.product")}</th>
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground">{t("dashboard.inquiries.customer")}</th>
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground">{t("dashboard.inquiries.email")}</th>
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground">{t("dashboard.inquiries.message")}</th>
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground">{t("dashboard.inquiries.date")}</th>
              </tr>
            </thead>
            <tbody>
              {inquiries.map((inq, index) => (
                <tr key={inq.id} className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                  <td className="py-3 px-4 text-muted-foreground">{index + 1}</td>
                  <td className="py-3 px-4 font-medium text-foreground">{inq.product_name || '—'}</td>
                  <td className="py-3 px-4 text-foreground">{inq.customer_name}</td>
                  <td className="py-3 px-4 text-muted-foreground">{inq.customer_email}</td>
                  <td className="py-3 px-4 text-muted-foreground max-w-xs truncate">{inq.message || '—'}</td>
                  <td className="py-3 px-4 text-muted-foreground">{new Date(inq.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
              {inquiries.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-muted-foreground">
                    {t("dashboard.inquiries.noInquiries")}
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
