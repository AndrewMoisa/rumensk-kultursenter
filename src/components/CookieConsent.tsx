"use client"

import { useState, useEffect, useCallback } from "react"
import { useTranslations } from "next-intl"

const COOKIE_CONSENT_KEY = "rkn-cookie-consent"

export function CookieConsent() {
  const t = useTranslations("CookieConsent")
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem(COOKIE_CONSENT_KEY)) {
      const timer = setTimeout(() => setVisible(true), 600)
      return () => clearTimeout(timer)
    }
  }, [])

  const accept = useCallback(() => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "accepted")
    setVisible(false)
  }, [])

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-label={t("title")}
      className="fixed bottom-0 inset-x-0 z-50 border-t border-border bg-background"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          {t("description")}
        </p>
        <button
          onClick={accept}
          className="shrink-0 rounded-md bg-primary px-5 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          {t("accept")}
        </button>
      </div>
    </div>
  )
}
