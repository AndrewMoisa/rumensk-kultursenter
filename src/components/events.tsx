"use client"

import { useEffect, useState } from "react"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/routing"
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

export function Events() {
  const t = useTranslations('Events')
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchEvents() {
      const supabase = createClient()
      const { data } = await supabase
        .from('events')
        .select('*')
        .order('created_at', { ascending: true })

      if (data) setEvents(data)
      setLoading(false)
    }
    fetchEvents()
  }, [])

  if (loading) {
    return (
      <section id="events" className="py-16 md:py-24 bg-gradient-to-b from-background to-blue-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-accent font-medium tracking-wider uppercase text-sm mb-2">
              {t('badge')}
            </p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4">
              {t('heading')}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="overflow-hidden border-border animate-pulse">
                <div className="h-72 w-full bg-muted" />
                <CardContent className="p-5 space-y-3">
                  <div className="h-4 bg-muted rounded w-1/3" />
                  <div className="h-6 bg-muted rounded w-2/3" />
                  <div className="h-4 bg-muted rounded w-full" />
                  <div className="h-4 bg-muted rounded w-1/4" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (events.length === 0) {
    return null
  }
  
  return (
    <section id="events" className="py-16 md:py-24 bg-gradient-to-b from-background to-blue-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-accent font-medium tracking-wider uppercase text-sm mb-2">
            {t('badge')}
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4">
            {t('heading')}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {t('description')}
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {events.slice(0, 4).map((event) => (
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
                <h3 className="font-serif text-xl font-semibold text-primary mb-2 group-hover:text-accent transition-colors line-clamp-2 min-h-[3.5rem]">
                  {event.title}
                </h3>

                {/* Description */}
                {event.description && (
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-4 mb-3">
                    {event.description}
                  </p>
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

        {/* View All Link */}
        <div className="text-center mt-10">
          <Link href="/events">
            <Button variant="outline" size="lg" className="group">
              {t('viewAll')}
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
