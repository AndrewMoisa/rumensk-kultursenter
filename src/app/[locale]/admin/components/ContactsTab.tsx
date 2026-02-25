"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { Trash2, ChevronDown, ChevronUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { ContactMessage } from "../types"

interface ContactsTabProps {
  contacts: ContactMessage[]
  onDeleteContact: (id: string) => void
}

export default function ContactsTab({ contacts, onDeleteContact }: ContactsTabProps) {
  const t = useTranslations('Admin')
  const [expandedId, setExpandedId] = useState<string | null>(null)

  return (
    <Card className="border-border/50 shadow-xl">
      <CardContent className="p-4 sm:p-6">
        <h2 className="font-serif text-xl font-semibold text-primary mb-4">
          {t("dashboard.contacts.title")}
        </h2>

        {contacts.length === 0 ? (
          <p className="py-8 text-center text-muted-foreground">
            {t("dashboard.contacts.noContacts")}
          </p>
        ) : (
          <div className="space-y-3">
            {contacts.map((contact, index) => {
              const isExpanded = expandedId === contact.id
              return (
                <div
                  key={contact.id}
                  className="border border-border/50 rounded-lg overflow-hidden hover:border-border transition-colors"
                >
                  {/* Header row — always visible */}
                  <div
                    className="flex items-center gap-3 p-3 sm:p-4 cursor-pointer hover:bg-muted/30 transition-colors"
                    onClick={() => setExpandedId(isExpanded ? null : contact.id)}
                  >
                    <span className="text-xs text-muted-foreground w-6 flex-shrink-0">{index + 1}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3">
                        <span className="font-medium text-foreground text-sm">{contact.name}</span>
                        <span className="text-xs text-muted-foreground truncate">{contact.email}</span>
                      </div>
                      {contact.subject && (
                        <p className="text-xs text-accent mt-0.5">{contact.subject}</p>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground flex-shrink-0 hidden sm:block">
                      {new Date(contact.created_at).toLocaleDateString()}
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
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-muted-foreground mb-1.5">{t("dashboard.contacts.message")}</p>
                          <p className="text-sm text-foreground whitespace-pre-wrap break-words leading-relaxed">
                            {contact.message}
                          </p>
                          <p className="text-xs text-muted-foreground mt-2 sm:hidden">
                            {new Date(contact.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => { e.stopPropagation(); onDeleteContact(contact.id) }}
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
