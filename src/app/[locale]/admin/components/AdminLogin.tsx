"use client"

import Image from "next/image"
import { Link } from "@/i18n/routing"
import { Shield, ArrowLeft, LogIn } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useTranslations } from "next-intl"

interface AdminLoginProps {
  isLoading: boolean
  error: string
  onLogin: (e: React.FormEvent<HTMLFormElement>) => void
}

export default function AdminLogin({ isLoading, error, onLogin }: AdminLoginProps) {
  const t = useTranslations('Admin')

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-blue-50/20 to-background flex items-center justify-center px-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          {t("login.backHome")}
        </Link>

        <Card className="border-border/50 shadow-2xl">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <Link href="/" className="inline-flex items-center gap-3 mb-6">
                <Image
                  src="/images/logo/logov2.png"
                  alt="RKS Logo"
                  width={80}
                  height={80}
                  className="object-contain"
                />
              </Link>

              <div className="inline-flex items-center gap-2 bg-primary/10 px-3 py-1 rounded-full mb-4">
                <Shield className="w-4 h-4 text-primary" />
                <span className="text-primary font-medium text-xs uppercase tracking-wider">
                  {t("login.badge")}
                </span>
              </div>

              <h1 className="font-serif text-2xl md:text-3xl font-bold text-primary mb-2">
                {t("login.heading")}
              </h1>
              <p className="text-sm text-muted-foreground">
                {t("login.description")}
              </p>
            </div>

            <form onSubmit={onLogin} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-foreground">
                  {t("login.email")}
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder={t("login.emailPlaceholder")}
                  required
                  className="h-11 border-border focus-visible:ring-accent"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-foreground">
                  {t("login.password")}
                </label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder={t("login.passwordPlaceholder")}
                  required
                  className="h-11 border-border focus-visible:ring-accent"
                />
              </div>

              {error && (
                <p className="text-sm text-destructive font-medium">{t(error)}</p>
              )}

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 bg-gradient-to-r from-primary to-primary/90 text-primary-foreground hover:from-primary/90 hover:to-primary/80 shadow-md hover:shadow-lg transition-all"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    {t("login.loading")}
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <LogIn className="w-4 h-4" />
                    {t("login.button")}
                  </span>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
