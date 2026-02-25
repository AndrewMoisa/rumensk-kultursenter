"use client"

import Image from "next/image"
import { Link } from "@/i18n/routing"
import { LogOut, ExternalLink } from "lucide-react"
import { useTranslations } from "next-intl"
import { NAV_ITEMS, SITE_LINKS } from "../constants"
import type { AdminTab } from "../types"

interface AdminSidebarProps {
  activeTab: AdminTab
  onTabChange: (tab: AdminTab) => void
  onLogout: () => void
  counts: Record<AdminTab, number>
}

export default function AdminSidebar({ activeTab, onTabChange, onLogout, counts }: AdminSidebarProps) {
  const t = useTranslations("Admin")

  return (
    <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 border-r border-border/50 bg-background/80 backdrop-blur-sm">
      {/* Logo + title */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-border/50">
        <Link href="/">
          <Image
            src="/images/logo/logov2.png"
            alt="RKS Logo"
            width={40}
            height={40}
            className="object-contain"
          />
        </Link>
        <div className="min-w-0">
          <h1 className="font-serif text-lg font-bold text-primary truncate">
            {t("dashboard.heading")}
          </h1>
          <p className="text-xs text-muted-foreground truncate">
            {t("dashboard.description")}
          </p>
        </div>
      </div>

      {/* Nav items */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map(({ id, icon: Icon, labelKey }) => {
          const count = counts[id]
          return (
            <button
              key={id}
              onClick={() => onTabChange(id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === id
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">{t(labelKey)}</span>
              {count > 0 && (
                <span className={`ml-auto text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${
                  activeTab === id
                    ? "bg-primary-foreground/20 text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}>
                  {count}
                </span>
              )}
            </button>
          )
        })}
      </nav>

      {/* Site links + Logout */}
      <div className="px-3 py-4 border-t border-border/50 space-y-1">
        <p className="px-3 pt-1 pb-2 text-xs font-semibold text-muted-foreground/60 uppercase tracking-wider">
          {t("dashboard.viewSite")}
        </p>
        {SITE_LINKS.map(({ href, icon: Icon, labelKey }) => (
          <Link
            key={href}
            href={href}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
          >
            <Icon className="w-4 h-4 flex-shrink-0" />
            <span className="truncate">{t(labelKey)}</span>
            <ExternalLink className="w-3 h-3 ml-auto flex-shrink-0 opacity-40" />
          </Link>
        ))}

        <div className="pt-2 mt-2 border-t border-border/50">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            {t("dashboard.logout")}
          </button>
        </div>
      </div>
    </aside>
  )
}
