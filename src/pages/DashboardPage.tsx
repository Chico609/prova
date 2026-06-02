import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useParticipations } from '@/hooks/useParticipations'
import { ParticipationTable } from '@/components/ParticipationTable'
import { ParticipationDialog } from '@/components/ParticipationDialog'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import {
  Loader2,
  LogOut,
  Plus,
  CalendarCheck,
  Clock,
  LayoutDashboard,
  CalendarDays,
  Sparkles,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export function DashboardPage() {
  const { user, signOut } = useAuth()
  const { participations, loading } = useParticipations()
  const navigate = useNavigate()

  const [dialogOpen, setDialogOpen] = useState(false)
  const [signingOut, setSigningOut] = useState(false)

  const total = participations.length
  const confirmados = participations.filter((p) => p.participacao === 'confirmado').length
  const pendentes = participations.filter((p) => p.participacao === 'pendente').length

  const handleSignOut = async () => {
    setSigningOut(true)
    const { error } = await signOut()
    if (error) {
      toast.error(`Erro ao sair: ${error}`)
      setSigningOut(false)
    } else {
      toast.success('Até logo!')
      navigate('/login')
    }
  }

  const displayName = user?.user_metadata?.full_name ?? user?.email ?? 'Usuário'
  const firstName = displayName.includes('@')
    ? displayName.split('@')[0]
    : displayName.split(' ')[0]

  const stats = [
    {
      label: 'Total de Registros',
      value: total,
      icon: CalendarDays,
      gradient: 'from-violet-500 to-purple-600',
      bg: 'bg-violet-50 dark:bg-violet-950/30',
      border: 'border-violet-100 dark:border-violet-900',
      text: 'text-violet-700 dark:text-violet-300',
      iconBg: 'bg-violet-100 dark:bg-violet-900/50',
      iconColor: 'text-violet-600 dark:text-violet-400',
    },
    {
      label: 'Confirmados',
      value: confirmados,
      icon: CalendarCheck,
      gradient: 'from-emerald-500 to-green-600',
      bg: 'bg-emerald-50 dark:bg-emerald-950/30',
      border: 'border-emerald-100 dark:border-emerald-900',
      text: 'text-emerald-700 dark:text-emerald-300',
      iconBg: 'bg-emerald-100 dark:bg-emerald-900/50',
      iconColor: 'text-emerald-600 dark:text-emerald-400',
    },
    {
      label: 'Pendentes',
      value: pendentes,
      icon: Clock,
      gradient: 'from-amber-500 to-orange-500',
      bg: 'bg-amber-50 dark:bg-amber-950/30',
      border: 'border-amber-100 dark:border-amber-900',
      text: 'text-amber-700 dark:text-amber-300',
      iconBg: 'bg-amber-100 dark:bg-amber-900/50',
      iconColor: 'text-amber-600 dark:text-amber-400',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/80 backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-950/80">
        <div className="mx-auto flex flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 shadow-md shadow-violet-500/25">
              <LayoutDashboard className="h-4 w-4 text-white" />
            </div>
            <div>
              <h1 className="text-base font-bold leading-none tracking-tight text-slate-900 dark:text-white">
                Controle DS
              </h1>
              <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                Olá, <span className="font-medium text-slate-700 dark:text-slate-300">{firstName}</span> 👋
              </p>
            </div>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleSignOut}
            disabled={signingOut}
            className="w-full justify-center gap-2 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white sm:w-auto"
          >
            {signingOut ? <Loader2 className="h-4 w-4 animate-spin" /> : <LogOut className="h-4 w-4" />}
            <span className="hidden sm:inline">Sair</span>
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 overflow-hidden rounded-2xl bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 p-6 shadow-xl shadow-violet-500/20 sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-violet-200" />
                <span className="text-sm font-medium text-violet-200">Painel de controle</span>
              </div>
              <h2 className="text-2xl font-bold text-white sm:text-3xl">Suas participações</h2>
              <p className="mt-1 text-sm text-violet-200">Gerencie e acompanhe todos os eventos em um só lugar.</p>
            </div>
            <Button
              onClick={() => setDialogOpen(true)}
              size="lg"
              className="w-full justify-center gap-2 bg-white text-violet-700 shadow-lg hover:bg-violet-50 hover:text-violet-800 focus-visible:ring-white sm:w-auto"
            >
              <Plus className="h-5 w-5" />
              Nova Participação
            </Button>
          </div>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <div
                key={stat.label}
                className={`relative overflow-hidden rounded-2xl border p-5 transition-all hover:-translate-y-0.5 hover:shadow-md ${stat.bg} ${stat.border}`}
              >
                <div className={`absolute -right-4 -top-4 h-20 w-20 rounded-full bg-gradient-to-br opacity-10 ${stat.gradient}`} />

                <div className="relative flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{stat.label}</p>
                    <div className="mt-2 flex items-end gap-1">
                      {loading ? (
                        <Loader2 className="h-7 w-7 animate-spin text-slate-400" />
                      ) : (
                        <span className={`text-4xl font-bold tabular-nums ${stat.text}`}>{stat.value}</span>
                      )}
                    </div>
                  </div>
                  <div className={`rounded-xl p-2.5 ${stat.iconBg}`}>
                    <Icon className={`h-5 w-5 ${stat.iconColor}`} />
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-col gap-3 px-6 py-4 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800 border-b border-slate-100">
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white">Minhas Participações</h3>
              <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                {loading
                  ? 'Carregando...'
                  : total === 0
                  ? 'Nenhum registro ainda'
                  : `${total} ${total === 1 ? 'registro' : 'registros'} encontrado${total === 1 ? '' : 's'}`}
              </p>
            </div>
            <Button
              onClick={() => setDialogOpen(true)}
              size="sm"
              variant="outline"
              className="gap-1.5 border-violet-200 text-violet-700 hover:bg-violet-50 hover:text-violet-800 dark:border-violet-800 dark:text-violet-400 dark:hover:bg-violet-950"
            >
              <Plus className="h-3.5 w-3.5" />
              Adicionar
            </Button>
          </div>

          <div className="p-4 sm:p-6">
            <ParticipationTable />
          </div>
        </div>
      </main>

      <ParticipationDialog open={dialogOpen} onOpenChange={setDialogOpen} record={null} />
    </div>
  )
}
