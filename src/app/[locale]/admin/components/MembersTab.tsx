"use client"

import { useTranslations } from "next-intl"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Application } from "../types"

interface MembersTabProps {
  applications: Application[]
  onStatusChange: (id: string, newStatus: string) => void
}

export default function MembersTab({ applications, onStatusChange }: MembersTabProps) {
  const t = useTranslations('Admin')

  return (
    <Card className="border-border/50 shadow-xl">
      <CardContent className="p-6">
        <h2 className="font-serif text-xl font-semibold text-primary mb-4">
          {t("dashboard.membersList")}
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground">#</th>
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground">{t("dashboard.table.name")}</th>
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground">{t("dashboard.table.email")}</th>
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground">{t("dashboard.table.phone")}</th>
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground">{t("dashboard.table.status")}</th>
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground">{t("dashboard.table.date")}</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app, index) => (
                <tr key={app.id} className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                  <td className="py-3 px-4 text-muted-foreground">{index + 1}</td>
                  <td className="py-3 px-4 font-medium text-foreground">{app.first_name} {app.last_name}</td>
                  <td className="py-3 px-4 text-muted-foreground">{app.email}</td>
                  <td className="py-3 px-4 text-muted-foreground">{app.phone || '—'}</td>
                  <td className="py-3 px-4">
                    <Select
                      value={app.status}
                      onValueChange={(value) => onStatusChange(app.id, value)}
                    >
                      <SelectTrigger className={`w-[130px] h-8 text-xs font-medium border-0 ${
                        app.status === 'paid' ? 'bg-green-100 text-green-800' :
                        app.status === 'approved' ? 'bg-blue-100 text-blue-800' :
                        app.status === 'rejected' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">{t("dashboard.statuses.pending")}</SelectItem>
                        <SelectItem value="approved">{t("dashboard.statuses.approved")}</SelectItem>
                        <SelectItem value="paid">{t("dashboard.statuses.paid")}</SelectItem>
                        <SelectItem value="rejected">{t("dashboard.statuses.rejected")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </td>
                  <td className="py-3 px-4 text-muted-foreground">{new Date(app.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
              {applications.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-muted-foreground">
                    {t("dashboard.noMembers")}
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
