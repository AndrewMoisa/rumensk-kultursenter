"use client"

import { Button } from "@/components/ui/button"
import { Calendar, ArrowRight } from "lucide-react"
import { useTranslations } from "next-intl"
import Image from "next/image"



export function Hero() {
    const t = useTranslations('HomePage');

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-gradient-to-br from-background via-blue-50/30 to-background">
      {/* Decorative top border with gradient */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-accent/20 to-accent/10 backdrop-blur-sm px-5 py-2.5 rounded-full border border-accent/30">
                <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                <p className="text-accent font-semibold tracking-wider uppercase text-sm">
                  {t('hero.subheading')}
                </p>
              </div>
              <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-primary leading-tight text-balance">
                <span className="bg-gradient-to-r from-primary via-accent/80 to-primary bg-clip-text text-transparent">
                  {t('hero.heading')}
                </span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-xl">
                {t('hero.description')}
              </p>
            </div>

            {/* Quick Action Buttons - The Golden Path */}
            <div className="flex xs:flex-row gap-4 flex-wrap">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-primary to-primary/90 text-primary-foreground hover:from-primary/90 hover:to-primary/80 gap-2 h-14 px-8 text-base shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all hover:scale-105"
                onClick={() => document.getElementById('events')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                aria-label="View upcoming events"
              >
                <Calendar className="w-5 h-5" />
                {t('hero.button.events')}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-accent/20">
              <div className="group">
                <p className="font-serif text-4xl md:text-5xl font-bold bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent group-hover:scale-110 transition-transform inline-block">5+</p>
                <p className="text-sm text-muted-foreground mt-2">{t('hero.dashboard.years')}</p>
              </div>
              <div className="group">
                <p className="font-serif text-4xl md:text-5xl font-bold bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent group-hover:scale-110 transition-transform inline-block">500+</p>
                <p className="text-sm text-muted-foreground mt-2">{t('hero.dashboard.members')}</p>
              </div>
              <div className="group">
                <p className="font-serif text-4xl md:text-5xl font-bold bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent group-hover:scale-110 transition-transform inline-block">100+</p>
                <p className="text-sm text-muted-foreground mt-2">{t('hero.dashboard.events')}</p>
              </div>
            </div>
          </div>

          {/* Visual Element */}
          <div className="relative lg:h-[600px] animate-fade-in-delayed">
            <div className="relative h-full sm:w-[500px] mx-auto lg:mx-0 lg:w-full">
              {/* Main Image Card */}
              <div className="relative bg-card rounded-3xl shadow-2xl overflow-hidden aspect-[4/5] lg:aspect-auto lg:h-full border border-accent/20 group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Image
                    src="/images/hero.jpeg"
                    alt="Romanian Cultural Center"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover rounded-3xl transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                
               
              </div>
              
              
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
