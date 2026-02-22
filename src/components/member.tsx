"use client"

import { Check, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTranslations } from "next-intl"

export function Members() {
  const t = useTranslations('Members')
  
  const benefits = [
    {
      title: t('benefits.restaurant.title'),
      description: t('benefits.restaurant.description'),
    },
    {
      title: t('benefits.shop.title'),
      description: t('benefits.shop.description'),
    },
    {
      title: t('benefits.events.title'),
      description: t('benefits.events.description'),
    },
    {
      title: t('benefits.language.title'),
      description: t('benefits.language.description'),
    },
  ]

  const features = [
    t('features.restaurantShop'),
    t('features.programs'),
    t('features.networking'),
    t('features.newsletter'),
    t('features.preservation'),
  ]

  return (
    <section id="members" className="py-12 md:py-16 bg-gradient-to-br from-primary via-primary to-primary/90 text-primary-foreground relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 bg-accent/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-accent font-medium tracking-wider uppercase text-sm">
              {t('badge')}
            </span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold leading-tight mb-4">
            {t('heading')}
          </h2>
          <p className="text-primary-foreground/80 leading-relaxed">
            {t('description')}
          </p>
        </div>

        {/* Main Content Card */}
        <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-2xl border border-primary-foreground/20 overflow-hidden">
          <div className="grid lg:grid-cols-[1fr,400px] gap-0">
            {/* Features List */}
            <div className="p-6 md:p-8">
              <h3 className="font-serif text-xl md:text-2xl font-bold mb-4">
                {t('memberBenefits')}
              </h3>
              <ul className="space-y-3">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-accent" />
                    </div>
                    <span className="text-primary-foreground/90 text-sm">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA Section */}
            <div className="bg-accent/10 border-l border-primary-foreground/20 p-6 md:p-8 flex flex-col justify-center">
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-primary-foreground/70 uppercase tracking-wider mb-2">
                    {t('pricing.yearlyMembership')}
                  </p>
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-4xl font-bold text-accent">300</span>
                    <span className="text-xl text-primary-foreground/80">{t('pricing.currency')}</span>
                  </div>
                  <p className="text-primary-foreground/70 text-sm">
                    {t('pricing.yearlyBenefits')}
                  </p>
                </div>

                <div className="space-y-2">
                  <a href="https://docs.google.com/forms/d/1G6JYT71NjkrplMG7v_FyIM1-lLrhix0d9on6ENDX1R8" target="_blank" rel="noopener noreferrer" className="block">
                    <Button 
                      size="default" 
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90 gap-2 h-10 px-8 text-base"
                    >
                      {t('button')}
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
