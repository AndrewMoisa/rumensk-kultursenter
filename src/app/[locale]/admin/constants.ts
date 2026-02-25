import { ShoppingBag, MessageSquare, Mail, Calendar, Users, Home, Store, CalendarDays, UserPlus, Phone } from "lucide-react"
import type { AdminTab } from "./types"
import type { LucideIcon } from "lucide-react"

export interface NavItem {
  id: AdminTab
  icon: LucideIcon
  labelKey: string
}

export interface SiteLink {
  href: "/" | "/store" | "/events" | "/join" | "/contact"
  icon: LucideIcon
  labelKey: string
}

export const NAV_ITEMS: NavItem[] = [
  { id: "members", icon: Users, labelKey: "dashboard.membersList" },
  { id: "products", icon: ShoppingBag, labelKey: "dashboard.products.title" },
  { id: "inquiries", icon: MessageSquare, labelKey: "dashboard.inquiries.title" },
  { id: "contacts", icon: Mail, labelKey: "dashboard.contacts.title" },
  { id: "events", icon: Calendar, labelKey: "dashboard.events.title" },
]

export const SITE_LINKS: SiteLink[] = [
  { href: "/", icon: Home, labelKey: "dashboard.siteLinks.home" },
  { href: "/store", icon: Store, labelKey: "dashboard.siteLinks.store" },
  { href: "/events", icon: CalendarDays, labelKey: "dashboard.siteLinks.events" },
  { href: "/join", icon: UserPlus, labelKey: "dashboard.siteLinks.join" },
  { href: "/contact", icon: Phone, labelKey: "dashboard.siteLinks.contact" },
]
