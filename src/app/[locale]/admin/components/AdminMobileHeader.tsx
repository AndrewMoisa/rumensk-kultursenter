"use client"

import Image from "next/image"
import { Link } from "@/i18n/routing"
import { LogOut, ExternalLink } from "lucide-react"
import { useTranslations } from "next-intl"
import { NAV_ITEMS } from "../constants"
import type { AdminTab } from "../types"

interface AdminMobileHeaderProps {
  activeTab: AdminTab
  onTabChange: (tab: AdminTab) => void
  onLogout: () => void
  counts: Record<AdminTab, number>
}

export default function AdminMobileHeader({ activeTab, onTabChange, onLogout, counts }: AdminMobileHeaderProps) {
  const t = useTranslations("Admin")

  return (
    <div className="lg:hidden sticky top-0 z-20 bg-background/95 backdrop-blur-sm border-b border-border/50">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <Link href="/">
            <Image
              src="/images/logo/logov2.png"
              alt="RKS Logo"
              width={32}
              height={32}
              className="object-contain"
            />
          </Link>
          <h1 className="font-serif text-lg font-bold text-primary">
            {t("dashboard.heading")}
          </h1>
        </div>
        <div className="flex items-center gap-1">
          <Link
            href="/"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            <span className="hidden sm:inline">{t("dashboard.viewSite")}</span>
          </Link>
          <button
            onClick={onLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">{t("dashboard.logout")}</span>
          </button>
        </div>
      </div>

      {/* Tab grid */}
      <div className="grid grid-cols-5 gap-1 px-2 pb-2">
        {NAV_ITEMS.map(({ id, icon: Icon, labelKey }) => {
          const count = counts[id]
          return (
            <button
              key={id}
              onClick={() => onTabChange(id)}
              className={`relative flex flex-col items-center justify-center gap-0.5 py-2 rounded-lg text-xs font-medium transition-colors min-h-[52px] ${
                activeTab === id
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] leading-tight truncate max-w-full px-0.5">{t(labelKey)}</span>
              {count > 0 && (
                <span className={`absolute -top-1 -right-0.5 text-[10px] font-bold min-w-[18px] h-[18px] flex items-center justify-center rounded-full ${
                  activeTab === id
                    ? "bg-primary-foreground text-primary"
                    : "bg-primary/15 text-primary"
                }`}>
                  {count}
                </span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
