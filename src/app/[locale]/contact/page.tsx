"use client"

import { useActionState } from "react"
import { Link } from "@/i18n/routing"
import { ArrowLeft, Mail, Send, MapPin, Phone } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useTranslations } from "next-intl"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { submitContactMessage, type ContactFormState } from "./actions"

const initialState: ContactFormState = { success: false, error: null }

export default function ContactPage() {
  const t = useTranslations("Contact")
  const ft = useTranslations("Footer")
  const [state, formAction, isPending] = useActionState(submitContactMessage, initialState)

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-blue-50/20 to-background">
      <Header />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 relative z-10">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-accent/10 px-3 py-1 rounded-full mb-4">
            <Mail className="w-4 h-4 text-accent" />
            <span className="text-accent font-medium text-xs uppercase tracking-wider">
              {t("badge")}
            </span>
          </div>

          <h1 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-3">
            {t("heading")}
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("description")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info Cards */}
          <div className="space-y-4">
            <Card className="border-border/50 shadow-lg">
              <CardContent className="p-6 flex items-start gap-4">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-primary text-sm mb-1">{t("info.address")}</h3>
                  <p className="text-sm text-muted-foreground">{ft("contact.address")}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50 shadow-lg">
              <CardContent className="p-6 flex items-start gap-4">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-primary text-sm mb-1">{t("info.phone")}</h3>
                  <p className="text-sm text-muted-foreground">{ft("contact.phone")}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50 shadow-lg">
              <CardContent className="p-6 flex items-start gap-4">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-primary text-sm mb-1">{t("info.email")}</h3>
                  <p className="text-sm text-muted-foreground">{ft("contact.email")}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="border-border/50 shadow-xl">
              <CardContent className="p-8">
                {state.success ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Send className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-primary mb-2">
                      {t("success.heading")}
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      {t("success.description")}
                    </p>
                    <Link href="/">
                      <Button variant="outline">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        {t("success.backHome")}
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <>
                    <h2 className="font-serif text-xl font-semibold text-primary mb-6">
                      {t("form.heading")}
                    </h2>

                    <form action={formAction} className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="name" className="text-sm font-medium text-foreground">
                            {t("form.name")}
                          </label>
                          <Input
                            id="name"
                            name="name"
                            type="text"
                            placeholder={t("form.namePlaceholder")}
                            required
                            className={`h-11 border-border focus-visible:ring-accent ${state.fieldErrors?.name ? 'border-destructive' : ''}`}
                          />
                          {state.fieldErrors?.name && (
                            <p className="text-xs text-destructive">{state.fieldErrors.name[0]}</p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="email" className="text-sm font-medium text-foreground">
                            {t("form.email")}
                          </label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder={t("form.emailPlaceholder")}
                            required
                            className={`h-11 border-border focus-visible:ring-accent ${state.fieldErrors?.email ? 'border-destructive' : ''}`}
                          />
                          {state.fieldErrors?.email && (
                            <p className="text-xs text-destructive">{state.fieldErrors.email[0]}</p>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="subject" className="text-sm font-medium text-foreground">
                          {t("form.subject")}
                        </label>
                        <Input
                          id="subject"
                          name="subject"
                          type="text"
                          placeholder={t("form.subjectPlaceholder")}
                          className={`h-11 border-border focus-visible:ring-accent ${state.fieldErrors?.subject ? 'border-destructive' : ''}`}
                        />
                        {state.fieldErrors?.subject && (
                          <p className="text-xs text-destructive">{state.fieldErrors.subject[0]}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="message" className="text-sm font-medium text-foreground">
                          {t("form.message")}
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          rows={5}
                          placeholder={t("form.messagePlaceholder")}
                          required
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
                        className="w-full h-11 bg-gradient-to-r from-primary to-primary/90 text-primary-foreground hover:from-primary/90 hover:to-primary/80 shadow-md hover:shadow-lg transition-all"
                      >
                        {isPending ? (
                          <span className="flex items-center gap-2">
                            <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                            {t("form.loading")}
                          </span>
                        ) : (
                          <span className="flex items-center gap-2">
                            <Send className="w-4 h-4" />
                            {t("form.button")}
                          </span>
                        )}
                      </Button>
                    </form>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
