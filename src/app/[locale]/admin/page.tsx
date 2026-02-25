"use client"

import { useState, useEffect, useCallback } from "react"
import { Link } from "@/i18n/routing"
import Image from "next/image"
import { Shield, ArrowLeft, LogIn } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useTranslations } from "next-intl"
import { createClient } from "@/lib/supabase/client"

interface Application {
  id: string
  first_name: string
  last_name: string
  email: string
  phone: string | null
  message: string | null
  status: string
  created_at: string
}

export default function AdminPage() {
  const t = useTranslations('Admin')
  const [isLoading, setIsLoading] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [error, setError] = useState("")
  const [applications, setApplications] = useState<Application[]>([])

  const supabase = createClient()

  const loadApplications = useCallback(async () => {
    const { data, error } = await supabase
      .from('membership_applications')
      .select('*')
      .order('created_at', { ascending: false })

    if (!error && data) {
      setApplications(data)
    }
  }, [supabase])

  // Check for existing session on mount
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setIsAuthenticated(true)
      }
    })
  }, [supabase])

  useEffect(() => {
    if (isAuthenticated) {
      loadApplications()
    }
  }, [isAuthenticated, loadApplications])

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (authError) {
      setError(t("login.error"))
    } else {
      setIsAuthenticated(true)
    }

    setIsLoading(false)
  }

  async function handleLogout() {
    await supabase.auth.signOut()
    setIsAuthenticated(false)
    setApplications([])
  }

  const pendingCount = applications.filter(a => a.status === 'pending').length
  const approvedCount = applications.filter(a => a.status === 'approved').length
  const paidCount = applications.filter(a => a.status === 'paid').length

  async function handleStatusChange(id: string, newStatus: string) {
    const { error } = await supabase
      .from('membership_applications')
      .update({ status: newStatus })
      .eq('id', id)

    if (!error) {
      setApplications(prev =>
        prev.map(app => app.id === id ? { ...app, status: newStatus } : app)
      )
    }
  }

  // Login screen
  if (!isAuthenticated) {
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

              <form onSubmit={handleLogin} className="space-y-4">
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
                  <p className="text-sm text-destructive font-medium">{error}</p>
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

  // Admin dashboard
  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-blue-50/20 to-background">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Image
                src="/images/logo/logov2.png"
                alt="RKS Logo"
                width={48}
                height={48}
                className="object-contain"
              />
            </Link>
            <div>
              <h1 className="font-serif text-2xl md:text-3xl font-bold text-primary">
                {t("dashboard.heading")}
              </h1>
              <p className="text-sm text-muted-foreground">
                {t("dashboard.description")}
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={handleLogout}
          >
            {t("dashboard.logout")}
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <Card className="border-border/50">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">{t("dashboard.totalMembers")}</p>
              <p className="text-3xl font-bold text-primary">{applications.length}</p>
            </CardContent>
          </Card>
          <Card className="border-border/50">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">{t("dashboard.thisMonth")}</p>
              <p className="text-3xl font-bold text-accent">{approvedCount}</p>
            </CardContent>
          </Card>
          <Card className="border-border/50">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">{t("dashboard.pending")}</p>
              <p className="text-3xl font-bold text-secondary">{pendingCount}</p>
            </CardContent>
          </Card>
        </div>

        {/* Members Table */}
        <Card className="border-border/50 shadow-xl">
          <CardContent className="p-6">
            <h2 className="font-serif text-xl font-semibold text-primary mb-4">
              {t("dashboard.membersList")}
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold text-muted-foreground">#</th>
                    <th className="text-left py-3 px-4 font-semibold text-muted-foreground">{t("dashboard.table.name")}</th>
                    <th className="text-left py-3 px-4 font-semibold text-muted-foreground">{t("dashboard.table.email")}</th>
                    <th className="text-left py-3 px-4 font-semibold text-muted-foreground">{t("dashboard.table.phone")}</th>
                    <th className="text-left py-3 px-4 font-semibold text-muted-foreground">{t("dashboard.table.status")}</th>
                    <th className="text-left py-3 px-4 font-semibold text-muted-foreground">{t("dashboard.table.date")}</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map((app, index) => (
                    <tr key={app.id} className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                      <td className="py-3 px-4 text-muted-foreground">{index + 1}</td>
                      <td className="py-3 px-4 font-medium text-foreground">{app.first_name} {app.last_name}</td>
                      <td className="py-3 px-4 text-muted-foreground">{app.email}</td>
                      <td className="py-3 px-4 text-muted-foreground">{app.phone || '—'}</td>
                      <td className="py-3 px-4">
                        <Select
                          value={app.status}
                          onValueChange={(value) => handleStatusChange(app.id, value)}
                        >
                          <SelectTrigger className={`w-[130px] h-8 text-xs font-medium border-0 ${
                            app.status === 'paid' ? 'bg-green-100 text-green-800' :
                            app.status === 'approved' ? 'bg-blue-100 text-blue-800' :
                            app.status === 'rejected' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">{t("dashboard.statuses.pending")}</SelectItem>
                            <SelectItem value="approved">{t("dashboard.statuses.approved")}</SelectItem>
                            <SelectItem value="paid">{t("dashboard.statuses.paid")}</SelectItem>
                            <SelectItem value="rejected">{t("dashboard.statuses.rejected")}</SelectItem>
                          </SelectContent>
                        </Select>
                      </td>
                      <td className="py-3 px-4 text-muted-foreground">{new Date(app.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                  {applications.length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-muted-foreground">
                        {t("dashboard.noMembers")}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
