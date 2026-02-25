"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { ChevronDown, ChevronUp, Mail, Phone as PhoneIcon, CalendarDays } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Application } from "../types"

interface MembersTabProps {
  applications: Application[]
  onStatusChange: (id: string, newStatus: string) => void
}

function StatusBadge({ status }: { status: string }) {
  const cls =
    status === 'paid' ? 'bg-green-100 text-green-800' :
    status === 'approved' ? 'bg-blue-100 text-blue-800' :
    status === 'rejected' ? 'bg-red-100 text-red-800' :
    'bg-yellow-100 text-yellow-800'
  return (
    <span className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full ${cls}`}>
      {status}
    </span>
  )
}

export default function MembersTab({ applications, onStatusChange }: MembersTabProps) {
  const t = useTranslations('Admin')
  const [expandedId, setExpandedId] = useState<string | null>(null)

  return (
    <Card className="border-border/50 shadow-xl">
      <CardContent className="p-4 sm:p-6">
        <h2 className="font-serif text-xl font-semibold text-primary mb-4">
          {t("dashboard.membersList")}
        </h2>

        {applications.length === 0 ? (
          <p className="py-8 text-center text-muted-foreground">
            {t("dashboard.noMembers")}
          </p>
        ) : (
          <>
            {/* Mobile card layout */}
            <div className="md:hidden space-y-3">
              {applications.map((app, index) => {
                const isExpanded = expandedId === app.id
                return (
                  <div
                    key={app.id}
                    className="border border-border/50 rounded-lg overflow-hidden hover:border-border transition-colors"
                  >
                    <div
                      className="flex items-center gap-3 p-3 cursor-pointer hover:bg-muted/30 transition-colors"
                      onClick={() => setExpandedId(isExpanded ? null : app.id)}
                    >
                      <span className="text-xs text-muted-foreground w-6 flex-shrink-0">{index + 1}</span>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground text-sm truncate">
                          {app.first_name} {app.last_name}
                        </p>
                        <p className="text-xs text-muted-foreground truncate mt-0.5">{app.email}</p>
                      </div>
                      <StatusBadge status={app.status} />
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                      )}
                    </div>

                    {isExpanded && (
                      <div className="border-t border-border/50 p-3 bg-muted/20 space-y-3">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm">
                            <Mail className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                            <a href={`mailto:${app.email}`} className="text-primary underline-offset-2 hover:underline truncate">
                              {app.email}
                            </a>
                          </div>
                          {app.phone && (
                            <div className="flex items-center gap-2 text-sm">
                              <PhoneIcon className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                              <a href={`tel:${app.phone}`} className="text-foreground">{app.phone}</a>
                            </div>
                          )}
                          <div className="flex items-center gap-2 text-sm">
                            <CalendarDays className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                            <span className="text-muted-foreground">{new Date(app.created_at).toLocaleDateString()}</span>
                          </div>
                        </div>

                        <div>
                          <p className="text-xs font-medium text-muted-foreground mb-1.5">{t("dashboard.table.status")}</p>
                          <Select
                            value={app.status}
                            onValueChange={(value) => onStatusChange(app.id, value)}
                          >
                            <SelectTrigger className={`w-full h-9 text-sm font-medium border-0 ${
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
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            {/* Desktop table layout */}
            <div className="hidden md:block overflow-x-auto">
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
                </tbody>
              </table>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
