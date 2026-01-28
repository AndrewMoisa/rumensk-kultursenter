"use client"

import { Calendar, MapPin, Clock, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const events = [
  {
    id: 1,
    title: "Romanian Language School",
    date: "Every Saturday",
    time: "11:00",
    location: "RKN Cultural House",
    category: "School",
    featured: true,
  },
  {
    id: 2,
    title: "Romanian Kindergarten",
    date: "Every Saturday",
    time: "11:00",
    location: "RKN Cultural House",
    category: "School",
    featured: false,
  }
]

export function Events() {

  return (
    <section id="events" className="py-20 md:py-28 bg-card overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div 
          className={`flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 transition-all duration-700 
          }`}
        >
          <div className="space-y-4">
            <p className={`text-accent font-medium tracking-wider uppercase text-sm transition-all duration-500 delay-100 `}>
              What{"'"}s Happening
            </p>
            <h2 className={`font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-primary text-balance transition-all duration-500 delay-200`}>
              Upcoming Events
            </h2>
            <p className={`text-muted-foreground max-w-xl leading-relaxed transition-all duration-500 delay-300 `}>
              Join us for cultural celebrations, workshops, and community gatherings 
              that bring together Romanian heritage and Norwegian hospitality.
            </p>
          </div>
          <Button 
            variant="outline" 
            className={`border-primary text-primary hover:bg-primary hover:text-primary-foreground gap-2 w-fit bg-transparent group hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 delay-400 `}
          >
            View All Events
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {events.map((event, index) => (
            <Card 
              key={event.id} 
              className={`group overflow-hidden border-border hover:border-accent/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 `}

            >
              <CardContent className="p-6">
                <div className="flex flex-col gap-4">
                  {/* Category & Featured Badge */}
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant="secondary" 
                      className="bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                    >
                      {event.category}
                    </Badge>
                    {event.featured && (
                      <Badge className="bg-accent text-accent-foreground animate-pulse">
                        Featured
                      </Badge>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-xl font-semibold text-primary group-hover:text-accent transition-colors duration-300">
                    {event.title}
                  </h3>

                  {/* Details */}
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2 group/item">
                      <Calendar className="w-4 h-4 text-accent group-hover/item:scale-110 transition-transform" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2 group/item">
                      <Clock className="w-4 h-4 text-accent group-hover/item:scale-110 transition-transform" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 group/item">
                      <MapPin className="w-4 h-4 text-accent group-hover/item:scale-110 transition-transform" />
                      <span>{event.location}</span>
                    </div>
                  </div>

                  {/* Action */}
                  <Button 
                    variant="ghost" 
                    className="w-fit mt-2 text-accent hover:text-accent hover:bg-accent/10 gap-2 p-0 group/btn"
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-2 transition-transform duration-300" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
