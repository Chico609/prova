import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { useParticipations } from '@/hooks/useParticipations'
import type { Participation } from '@/types'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ParticipationDialog } from '@/components/ParticipationDialog'
import { ParticipationTable } from '@/components/ParticipationTable'
import { toast } from 'sonner'

export function DashboardPage() {
  const navigate = useNavigate()
  const { user, signOut } = useAuth()
  const { getParticipations, createParticipation, updateParticipation, deleteParticipation, loading } = useParticipations()
  
  const [participations, setParticipations] = useState<Participation[]>([])
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedParticipation, setSelectedParticipation] = useState<Participation | undefined>(undefined)
  const [dataLoading, setDataLoading] = useState(true)

  useEffect(() => {
    loadParticipations()
  }, [])

  const loadParticipations = async () => {
    if (!user?.id) return
    try {
      setDataLoading(true)
      const data = await getParticipations(user.id)
      setParticipations(data)
    } catch (err) {
      toast.error('Erro ao carregar participações')
    } finally {
      setDataLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await signOut()
      toast.success('Logout efetuado com sucesso!')
      navigate('/login')
    } catch (err) {
      toast.error('Erro ao fazer logout')
    }
  }

  const handleEdit = (participation: Participation) => {
    setSelectedParticipation(participation)
    setDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteParticipation(id)
      toast.success('Participação deletada com sucesso!')
      await loadParticipations()
    } catch (err) {
      toast.error('Erro ao deletar participação')
    }
  }

  const handleDialogSubmit = async (data: any) => {
    if (!user?.id) return
    try {
      if (selectedParticipation) {
        await updateParticipation(selectedParticipation.id, data)
        toast.success('Participação atualizada com sucesso!')
      } else {
        await createParticipation(user.id, data)
        toast.success('Participação criada com sucesso!')
      }
      setSelectedParticipation(undefined)
      await loadParticipations()
    } catch (err) {
      toast.error('Erro ao salvar participação')
    }
  }

  const stats = {
    total: participations.length,
    confirmado: participations.filter(p => p.participacao === 'confirmado').length,
    pendente: participations.filter(p => p.participacao === 'pendente').length,
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Controle DS</h1>
              <p className="text-sm text-foreground/80">Bem-vindo, {user?.email}</p>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              Sair
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-foreground/70">
                Total de Participações
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-foreground/70">
                Confirmadas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.confirmado}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-foreground/70">
                Pendentes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{stats.pendente}</div>
            </CardContent>
          </Card>
        </div>

        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground">Minhas Participações</h2>
          <Button
            onClick={() => {
              setSelectedParticipation(undefined)
              setDialogOpen(true)
            }}
          >
            Nova Participação
          </Button>
        </div>

        <ParticipationTable
          data={participations}
          onEdit={handleEdit}
          onDelete={handleDelete}
          loading={dataLoading || loading}
        />
      </main>

      <ParticipationDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        participation={selectedParticipation}
        onSubmit={handleDialogSubmit}
        loading={loading}
      />
    </div>
  )
}
