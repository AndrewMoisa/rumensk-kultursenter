"use client"

import { useActionState } from "react"
import { Link } from "@/i18n/routing"
import Image from "next/image"
import { Sparkles, Send } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useTranslations } from "next-intl"
import { submitMemberApplication, type JoinFormState } from "./actions"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function JoinPage() {
  const t = useTranslations('JoinUs')

  const initialState: JoinFormState = { success: false, error: null }
  const [state, formAction, isPending] = useActionState(submitMemberApplication, initialState)

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-background via-blue-50/20 to-background flex items-center justify-center px-4 pt-28 pb-12">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        </div>

        <div className="w-full max-w-md relative z-10">

        <Card className="border-border/50 shadow-2xl">
          <CardContent className="p-8">
            {/* Logo & Header */}
            <div className="text-center mb-8 flex flex-col items-center">
              <Link href="/" className="inline-flex items-center gap-3 mb-6">
                <Image
                  src="/images/logo/logov2.png"
                  alt="RKS Logo"
                  width={80}
                  height={80}
                  className="object-contain"
                />
              </Link>

              <div className="inline-flex items-center gap-2 bg-accent/10 px-3 py-1 rounded-full mb-4">
                <Sparkles className="w-4 h-4 text-accent" />
                <span className="text-accent font-medium text-xs uppercase tracking-wider">
                  {t('badge')}
                </span>
              </div>

              <h1 className="font-serif text-2xl md:text-3xl font-bold text-primary mb-2">
                {t('heading')}
              </h1>
              <p className="text-sm text-muted-foreground">
                {t('description')}
              </p>
            </div>

            {state.success ? (
              /* Success message */
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="font-serif text-xl font-bold text-primary mb-2">
                  {t('success.heading')}
                </h2>
                <p className="text-sm text-muted-foreground mb-6">
                  {t('success.description')}
                </p>
                <Link href="/">
                  <Button variant="outline">{t('success.backHome')}</Button>
                </Link>
              </div>
            ) : (
              /* Form */
              <form action={formAction} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="firstName" className="text-sm font-medium text-foreground">
                      {t('fields.firstName')}
                    </label>
                    <Input
                      id="firstName"
                      name="firstName"
                      type="text"
                      placeholder={t('fields.firstNamePlaceholder')}
                      required
                      className={`h-11 border-border focus-visible:ring-accent ${state.fieldErrors?.firstName ? 'border-destructive' : ''}`}
                    />
                    {state.fieldErrors?.firstName && (
                      <p className="text-xs text-destructive">{state.fieldErrors.firstName[0]}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="lastName" className="text-sm font-medium text-foreground">
                      {t('fields.lastName')}
                    </label>
                    <Input
                      id="lastName"
                      name="lastName"
                      type="text"
                      placeholder={t('fields.lastNamePlaceholder')}
                      required
                      className={`h-11 border-border focus-visible:ring-accent ${state.fieldErrors?.lastName ? 'border-destructive' : ''}`}
                    />
                    {state.fieldErrors?.lastName && (
                      <p className="text-xs text-destructive">{state.fieldErrors.lastName[0]}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-foreground">
                    {t('fields.email')}
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder={t('fields.emailPlaceholder')}
                    required
                    className={`h-11 border-border focus-visible:ring-accent ${state.fieldErrors?.email ? 'border-destructive' : ''}`}
                  />
                  {state.fieldErrors?.email && (
                    <p className="text-xs text-destructive">{state.fieldErrors.email[0]}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium text-foreground">
                    {t('fields.phone')}
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder={t('fields.phonePlaceholder')}
                    className={`h-11 border-border focus-visible:ring-accent ${state.fieldErrors?.phone ? 'border-destructive' : ''}`}
                  />
                  {state.fieldErrors?.phone && (
                    <p className="text-xs text-destructive">{state.fieldErrors.phone[0]}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-foreground">
                    {t('fields.message')}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder={t('fields.messagePlaceholder')}
                    rows={3}
                    className={`flex w-full rounded-md border border-border bg-transparent px-3 py-2 text-base md:text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent resize-none ${state.fieldErrors?.message ? 'border-destructive' : ''}`}
                  />
                  {state.fieldErrors?.message && (
                    <p className="text-xs text-destructive">{state.fieldErrors.message[0]}</p>
                  )}
                </div>

                {state.error && (
                  <p className="text-sm text-destructive font-medium">{state.error}</p>
                )}

                <Button
                  type="submit"
                  disabled={isPending}
                  className="w-full h-11 bg-gradient-to-r from-primary to-primary/90 text-primary-foreground hover:from-primary/90 hover:to-primary/80 shadow-md hover:shadow-lg transition-all mt-2"
                >
                  {isPending ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      {t('form.loading')}
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="w-4 h-4" />
                      {t('form.button')}
                    </span>
                  )}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
        </div>
      </main>
      <Footer />
    </>
  )
}
