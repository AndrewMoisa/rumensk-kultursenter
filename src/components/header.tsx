"use client"

import { useState } from "react"
import { Link } from "@/i18n/routing"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import LanguageSwitcher from "./LanguageSwitcher"
import Image from "next/image"
import { useTranslations } from "next-intl"

export function Header() {
  const t = useTranslations('Header')
  const [isOpen, setIsOpen] = useState(false)
  
  const navigation = [
    { name: t('nav.events'), href: "#events" },
    { name: t('nav.contact'), href: "#contact" },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-md border-b border-accent/20 shadow-lg shadow-primary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center group-hover:scale-105 transition-all">
              <Image 
                src="/images/logo/logov2.png"
                alt="RKS Logo"
                width={48}
                height={48}
                className="object-contain"
                priority
              />
            </div>
            <div className="hidden sm:block">
              <p className="font-serif text-lg md:text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent leading-tight">Rumensk</p>
              <p className="text-xs text-muted-foreground leading-tight">Kultursenter</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-semibold text-foreground/70 hover:text-primary transition-all relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent transition-all group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* Right side - Language & CTA */}
          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <LanguageSwitcher />
            {/* Desktop CTA */}
            <Link href="/join">
              <Button className="hidden md:flex bg-gradient-to-r from-primary to-primary/90 text-primary-foreground hover:from-primary/90 hover:to-primary/80 shadow-md hover:shadow-lg transition-all hover:scale-105">
                {t('joinUs')}
              </Button>
            </Link>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="lg:hidden hover:bg-accent/20 rounded-md">
                <Button variant="ghost" size="icon">
                  <Menu className="w-10 h-10 " />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] bg-card">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <div className="flex flex-col gap-6 mt-8">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="text-lg font-medium text-foreground hover:text-accent transition-colors"
                    >
                      {item.name}
                    </Link>
                  ))}
                  <Link href="/join" onClick={() => setIsOpen(false)}>
                    <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/80">
                      {t('joinUs')}
                    </Button>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
