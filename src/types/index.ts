// Event types
export interface Event {
  id: number
  title: string
  description: string
  day: string
  date: string
  time: string
  image: string
}

// Navigation types
export interface NavigationItem {
  name: string
  href: string
}

// Social media types
export interface SocialLink {
  name: string
  icon: React.ComponentType<{ className?: string }>
  href: string
}

// Language types
export interface Language {
  code: 'no' | 'en' | 'ro'
  name: string
  flag: string
}

// Values/Benefits types
export interface Value {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  color: string
  hoverColor: string
}

export interface Benefit {
  title: string
  description: string
}
