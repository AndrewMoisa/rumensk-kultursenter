"use client"

import { useTranslations } from "next-intl"
import { Users, Heart, Globe, GraduationCap } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function Values() {
  const t = useTranslations('About')

  const values = [
    {
      icon: Users,
      title: t('values.community.title'),
      description: t('values.community.description'),
      color: "from-blue-500/20 to-blue-600/20",
      hoverColor: "group-hover:from-blue-500/30 group-hover:to-blue-600/30"
    },
    {
      icon: Heart,
      title: t('values.culture.title'),
      description: t('values.culture.description'),
      color: "from-red-500/20 to-pink-600/20",
      hoverColor: "group-hover:from-red-500/30 group-hover:to-pink-600/30"
    },
    {
      icon: Globe,
      title: t('values.integration.title'),
      description: t('values.integration.description'),
      color: "from-green-500/20 to-emerald-600/20",
      hoverColor: "group-hover:from-green-500/30 group-hover:to-emerald-600/30"
    },
    {
      icon: GraduationCap,
      title: t('values.education.title'),
      description: t('values.education.description'),
      color: "from-purple-500/20 to-indigo-600/20",
      hoverColor: "group-hover:from-purple-500/30 group-hover:to-indigo-600/30"
    },
  ]

  return (
    <section className="py-16 md:py-24 bg-background relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -right-20 w-72 h-72 bg-accent/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 -left-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-accent/20 to-accent/10 backdrop-blur-sm px-5 py-2.5 rounded-full border border-accent/30 mb-4">
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
            <p className="text-accent font-semibold tracking-wider uppercase text-sm">
              {t('badge')}
            </p>
          </div>
        </div>

        {/* Values Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => {
            const Icon = value.icon
            return (
              <Card
                key={index}
                className="group hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 border-border hover:border-accent/50 bg-card/80 backdrop-blur-sm overflow-hidden relative"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-0 ${value.hoverColor} transition-all duration-500`}></div>
                <CardContent className="p-8 text-center relative z-10">
                  <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-accent/10 to-primary/10 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
                    <Icon className="w-10 h-10 text-accent group-hover:text-primary transition-colors duration-300" />
                  </div>
                  <h4 className="font-serif text-xl font-bold text-primary mb-4 group-hover:text-accent transition-colors duration-300">
                    {value.title}
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
