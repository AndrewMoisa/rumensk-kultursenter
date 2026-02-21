"use client"

import Link from "next/link"
import { Mail, Phone, MapPin, Facebook } from "lucide-react"
import { useTranslations } from "next-intl"

export function Footer() {
  const t = useTranslations('Footer')
  
  

  const socialLinks = [
    { name: "Facebook", icon: Facebook, href: "https://www.facebook.com/profile.php?id=100085325405544" },
  ]

  return (
    <footer id="contact" className="bg-primary text-primary-foreground overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className={`lg:col-span-1 transition-all duration-700 `}>
            <div className="flex items-center gap-3 mb-6 group">
              <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                <span className="font-serif font-bold text-lg text-primary">R</span>
              </div>
              <div>
                <p className="font-serif text-lg font-semibold">{t('brand.name')}</p>
                <p className="text-xs text-primary-foreground/60">{t('brand.subtitle')}</p>
              </div>
            </div>
            <p className="text-primary-foreground/70 text-sm leading-relaxed mb-6">
              {t('brand.description')}
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <Link
                  key={social.name}
                  href={social.href}
                  className={`w-10 h-10 bg-primary-foreground/10 rounded-lg flex items-center justify-center hover:bg-accent hover:text-accent-foreground hover:scale-110 hover:-translate-y-1 transition-all duration-300 `}
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className={`transition-all duration-700 delay-200`}>
            <h3 className="font-serif font-semibold text-lg mb-6">{t('contact.title')}</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm group">
                <MapPin className="w-5 h-5 text-accent flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-200" />
                <span className="text-primary-foreground/70">
                  {t('contact.address')}
                </span>
              </li>
              <li className="flex items-center gap-3 text-sm group">
                <Phone className="w-5 h-5 text-accent flex-shrink-0 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-200" />
                <span className="text-primary-foreground/70 group-hover:text-accent transition-colors">{t('contact.phone')}</span>
              </li>
              <li className="flex items-center gap-3 text-sm group">
                <Mail className="w-5 h-5 text-accent flex-shrink-0 group-hover:scale-110 transition-transform duration-200" />
                <span className="text-primary-foreground/70 group-hover:text-accent transition-colors">{t('contact.email')}</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className={`mt-16 pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-4 transition-all duration-700 delay-500`}>
          <p className="text-primary-foreground/60 text-sm">
            {t('copyright')}
          </p>
        </div>
      </div>
    </footer>
  )
}
