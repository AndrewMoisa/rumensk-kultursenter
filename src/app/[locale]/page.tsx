import { Header } from '@/components/header'
import { Hero } from '@/components/hero'
import { Members } from '@/components/member'
import { Events } from '@/components/events'
import { Values } from '@/components/values'
import { Footer } from '@/components/footer'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-blue-50/20 to-background">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <Hero />

      {/* Members Section */}
      <Members />

      {/* Events Section */}
      <Events />

      {/* Our Values Section */}
      <Values />

      {/* Footer */}
      <Footer />
    </main>
  );
}
