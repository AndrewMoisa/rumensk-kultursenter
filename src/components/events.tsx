"use client"

import { Calendar, Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { useTranslations } from "next-intl"

export function Events() {
  const t = useTranslations('Events')
  
  const events = [
    {
      id: 1,
      title: t('event1.title'),
      description: t('event1.description'),
      day: t('event1.day'),
      date: t('event1.date'),
      time: t('event1.time'),
      image: "/images/events/activitate2.jpg",
    },
    {
      id: 2,
      title: t('event2.title'),
      description: t('event2.description'),
      day: t('event2.day'),
      date: t('event2.date'),
      time: t('event2.time'),
      image: "/images/events/lucrumanualv4.jpg",
    },
    {
      id: 3,
      title: t('event3.title'),
      description: t('event3.description'),
      day: t('event3.day'),
      date: t('event3.date'),
      time: t('event3.time'),
      image: "/images/events/adulti.jpg",
    },
    {
      id: 4,
      title: t('event4.title'),
      description: t('event4.description'),
      day: t('event4.day'),
      date: t('event4.date'),
      time: t('event4.time'),
      image: "/images/events/adulti.jpg",
    },
  ]
  
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
          {events.map((event) => (
            <Card 
              key={event.id} 
              className="group overflow-hidden border-border hover:border-accent/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            >
              {/* Event Image */}
              <div className="relative h-56 w-full overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              <CardContent className="p-5">
                {/* Date & Time */}
                <div className="flex items-center gap-4 mb-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-accent" />
                    <span className="font-medium">{event.day}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-accent" />
                    <span>{event.time}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-serif text-xl font-semibold text-primary mb-2 group-hover:text-accent transition-colors line-clamp-2 min-h-[3.5rem]">
                  {event.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-4 mb-3">
                  {event.description}
                </p>

                {/* Full Date */}
                <p className="text-xs text-accent font-medium mt-3">
                  {event.date}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
