"use client"

import { useEffect, useState } from "react"
import { Calendar, Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import Image from "next/image"
import { useTranslations } from "next-intl"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { createClient } from "@/lib/supabase/client"

interface Event {
  id: string
  title: string
  description: string | null
  day: string | null
  date: string | null
  time: string | null
  image_url: string | null
  created_at: string
}

export default function EventsPage() {
  const t = useTranslations("Events")
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [expandedEvents, setExpandedEvents] = useState<Set<string>>(new Set())

  const toggleExpand = (id: string) => {
    setExpandedEvents((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  useEffect(() => {
    async function fetchEvents() {
      const supabase = createClient()
      const { data } = await supabase
        .from("events")
        .select("*")
        .order("created_at", { ascending: true })

      if (data) setEvents(data)
      setLoading(false)
    }
    fetchEvents()
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-blue-50/20 to-background">
      <Header />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 relative z-10">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-accent/10 px-3 py-1 rounded-full mb-4">
            <Calendar className="w-4 h-4 text-accent" />
            <span className="text-accent font-medium text-xs uppercase tracking-wider">
              {t("badge")}
            </span>
          </div>

          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-3">
            {t("heading")}
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {t("description")}
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="overflow-hidden border-border">
                <Skeleton className="h-72 w-full rounded-none" />
                <CardContent className="p-5 space-y-3">
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-6 w-2/3" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-1/4" />
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && events.length === 0 && (
          <Card className="border-border/50">
            <CardContent className="p-12 text-center">
              <Calendar className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" />
              <p className="text-muted-foreground text-lg">{t("noEvents")}</p>
            </CardContent>
          </Card>
        )}

        {/* Events Grid */}
        {!loading && events.length > 0 && (
          <div className="grid md:grid-cols-2 gap-6">
            {events.map((event) => (
              <Card
                key={event.id}
                className="group overflow-hidden border-border hover:border-accent/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
              >
                {/* Event Image */}
                {event.image_url && (
                  <div className="relative h-72 w-full overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20">
                    <Image
                      src={event.image_url}
                      alt={event.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                )}

                <CardContent className="p-5">
                  {/* Date & Time */}
                  {(event.day || event.time) && (
                    <div className="flex items-center gap-4 mb-3 text-sm text-muted-foreground">
                      {event.day && (
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-4 h-4 text-accent" />
                          <span className="font-medium">{event.day}</span>
                        </div>
                      )}
                      {event.time && (
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4 text-accent" />
                          <span>{event.time}</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Title */}
                  <h3 className="font-serif text-xl font-semibold text-primary mb-2 group-hover:text-accent transition-colors line-clamp-2">
                    {event.title}
                  </h3>

                  {/* Description */}
                  {event.description && (
                    <div className="mb-3">
                      <p className={`text-sm text-muted-foreground leading-relaxed whitespace-pre-line ${!expandedEvents.has(event.id) ? 'line-clamp-4' : ''}`}>
                        {event.description}
                      </p>
                      {event.description.length > 150 && (
                        <button
                          onClick={() => toggleExpand(event.id)}
                          className="text-xs text-accent hover:text-accent/80 font-medium mt-1.5 transition-colors"
                        >
                          {expandedEvents.has(event.id) ? t("showLess") : t("readMore")}
                        </button>
                      )}
                    </div>
                  )}

                  {/* Full Date */}
                  {event.date && (
                    <p className="text-xs text-accent font-medium mt-3">
                      {event.date}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </main>
  )
}
