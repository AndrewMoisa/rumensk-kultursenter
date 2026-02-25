"use client"

import { useTranslations } from "next-intl"
import { Plus, Trash2, Upload, Pencil, Check, X } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { Event } from "../types"

interface EventsTabProps {
  events: Event[]
  showAddEvent: boolean
  setShowAddEvent: (show: boolean) => void
  eventFileName: string | null
  setEventFileName: (name: string | null) => void
  editingEvent: Event | null
  setEditingEvent: (event: Event | null) => void
  editEventFileName: string | null
  setEditEventFileName: (name: string | null) => void
  onAddEvent: (e: React.FormEvent<HTMLFormElement>) => void
  onEditEvent: (e: React.FormEvent<HTMLFormElement>) => void
  onDeleteEvent: (id: string) => void
}

export default function EventsTab({
  events,
  showAddEvent,
  setShowAddEvent,
  eventFileName,
  setEventFileName,
  editingEvent,
  setEditingEvent,
  editEventFileName,
  setEditEventFileName,
  onAddEvent,
  onEditEvent,
  onDeleteEvent,
}: EventsTabProps) {
  const t = useTranslations('Admin')

  return (
    <Card className="border-border/50 shadow-xl">
      <CardContent className="p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-serif text-xl font-semibold text-primary">
            {t("dashboard.events.title")}
          </h2>
          <Button
            size="sm"
            onClick={() => setShowAddEvent(!showAddEvent)}
            className="bg-gradient-to-r from-primary to-primary/90 text-primary-foreground hover:from-primary/90 hover:to-primary/80"
          >
            <Plus className="w-4 h-4 mr-1.5" />
            {t("dashboard.events.add")}
          </Button>
        </div>

        {/* Add Event Form */}
        {showAddEvent && (
          <form onSubmit={onAddEvent} className="border border-border rounded-lg p-4 mb-6 space-y-3 bg-muted/30">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-sm font-medium">{t("dashboard.events.name")}</label>
                <Input name="eventTitle" required placeholder={t("dashboard.events.namePlaceholder")} className="h-10" />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium">{t("dashboard.events.day")}</label>
                <Input name="eventDay" placeholder={t("dashboard.events.dayPlaceholder")} className="h-10" />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-sm font-medium">{t("dashboard.events.date")}</label>
                <Input name="eventDate" placeholder={t("dashboard.events.datePlaceholder")} className="h-10" />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium">{t("dashboard.events.time")}</label>
                <Input name="eventTime" placeholder={t("dashboard.events.timePlaceholder")} className="h-10" />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">{t("dashboard.events.description")}</label>
              <textarea
                name="eventDescription"
                rows={8}
                placeholder={t("dashboard.events.descriptionPlaceholder")}
                className="flex w-full rounded-md border border-border bg-transparent px-3 py-2 text-base md:text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent resize-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">{t("dashboard.events.image")}</label>
              <div className="flex items-center gap-2">
                <label className="flex items-center gap-2 px-3 py-2 rounded-md border border-border bg-background text-sm cursor-pointer hover:bg-muted transition-colors">
                  <Upload className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    {eventFileName || t("dashboard.events.chooseFile")}
                  </span>
                  <input
                    name="eventImage"
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    onChange={(e) => setEventFileName(e.target.files?.[0]?.name || null)}
                  />
                </label>
                {eventFileName && (
                  <Check className="w-4 h-4 text-green-600" />
                )}
              </div>
            </div>
            <div className="flex gap-2">
              <Button type="submit" size="sm">{t("dashboard.events.save")}</Button>
              <Button type="button" variant="outline" size="sm" onClick={() => setShowAddEvent(false)}>{t("dashboard.events.cancel")}</Button>
            </div>
          </form>
        )}

        {/* Events List */}
        {events.length === 0 ? (
          <p className="py-8 text-center text-muted-foreground">
            {t("dashboard.events.noEvents")}
          </p>
        ) : (
          <div className="space-y-3">
            {events.map((event, index) =>
              editingEvent?.id === event.id ? (
                <div key={event.id} className="border border-border/50 rounded-lg p-3 sm:p-4 bg-muted/30">
                  <form onSubmit={onEditEvent} className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-sm font-medium">{t("dashboard.events.name")}</label>
                        <Input name="editTitle" defaultValue={event.title} required className="h-9" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-sm font-medium">{t("dashboard.events.day")}</label>
                        <Input name="editDay" defaultValue={event.day || ''} className="h-9" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="space-y-1">
                        <label className="text-sm font-medium">{t("dashboard.events.date")}</label>
                        <Input name="editDate" defaultValue={event.date || ''} className="h-9" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-sm font-medium">{t("dashboard.events.time")}</label>
                        <Input name="editTime" defaultValue={event.time || ''} className="h-9" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-sm font-medium">{t("dashboard.events.image")}</label>
                        <label className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-border bg-background text-sm cursor-pointer hover:bg-muted transition-colors">
                          <Upload className="w-3.5 h-3.5 text-muted-foreground" />
                          <span className="text-muted-foreground text-xs truncate">
                            {editEventFileName || (event.image_url ? t("dashboard.events.changeImage") : t("dashboard.events.chooseFile"))}
                          </span>
                          <input name="editImage" type="file" accept="image/*" className="sr-only" onChange={(e) => setEditEventFileName(e.target.files?.[0]?.name || null)} />
                        </label>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm font-medium">{t("dashboard.events.description")}</label>
                      <textarea
                        name="editDescription"
                        rows={8}
                        defaultValue={event.description || ''}
                        className="flex w-full rounded-md border border-border bg-transparent px-3 py-2 text-base md:text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent resize-none"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button type="submit" size="sm">
                        <Check className="w-3.5 h-3.5 mr-1" />
                        {t("dashboard.events.save")}
                      </Button>
                      <Button type="button" variant="outline" size="sm" onClick={() => { setEditingEvent(null); setEditEventFileName(null); }}>
                        <X className="w-3.5 h-3.5 mr-1" />
                        {t("dashboard.events.cancel")}
                      </Button>
                    </div>
                  </form>
                </div>
              ) : (
                <div
                  key={event.id}
                  className="border border-border/50 rounded-lg p-3 sm:p-4 hover:border-border transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-xs text-muted-foreground w-6 flex-shrink-0 mt-0.5">{index + 1}</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground text-sm">{event.title}</p>
                      <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-1 text-xs text-muted-foreground">
                        {event.day && <span>{event.day}</span>}
                        {event.date && <span>{event.date}</span>}
                        {event.time && <span>{event.time}</span>}
                      </div>
                      {event.description && (
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-5">{event.description}</p>
                      )}
                    </div>
                    <div className="flex gap-1 flex-shrink-0">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setEditingEvent(event)}
                        className="text-primary hover:text-primary hover:bg-primary/10 h-8 w-8 p-0"
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDeleteEvent(event.id)}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10 h-8 w-8 p-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
