"use client"

import { useTranslations } from "next-intl"
import { Card, CardContent } from "@/components/ui/card"

interface AdminStatsCardsProps {
  totalMembers: number
  approvedCount: number
  pendingCount: number
}

export default function AdminStatsCards({ totalMembers, approvedCount, pendingCount }: AdminStatsCardsProps) {
  const t = useTranslations("Admin")

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-8">
      <Card className="border-border/50">
        <CardContent className="p-3 sm:p-6 flex sm:block items-center justify-between">
          <p className="text-xs sm:text-sm text-muted-foreground">{t("dashboard.totalMembers")}</p>
          <p className="text-2xl sm:text-3xl font-bold text-primary">{totalMembers}</p>
        </CardContent>
      </Card>
      <Card className="border-border/50">
        <CardContent className="p-3 sm:p-6 flex sm:block items-center justify-between">
          <p className="text-xs sm:text-sm text-muted-foreground">{t("dashboard.thisMonth")}</p>
          <p className="text-2xl sm:text-3xl font-bold text-accent">{approvedCount}</p>
        </CardContent>
      </Card>
      <Card className="border-border/50">
        <CardContent className="p-3 sm:p-6 flex sm:block items-center justify-between">
          <p className="text-xs sm:text-sm text-muted-foreground">{t("dashboard.pending")}</p>
          <p className="text-2xl sm:text-3xl font-bold text-secondary">{pendingCount}</p>
        </CardContent>
      </Card>
    </div>
  )
}
