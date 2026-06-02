import { useState } from 'react'
import type { Participation } from '@/types'
import { Button } from '@/components/ui/button'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import { StatusBadge } from './StatusBadge'

interface ParticipationTableProps {
  data: Participation[]
  onEdit: (participation: Participation) => void
  onDelete: (id: string) => Promise<void>
  loading?: boolean
}

export function ParticipationTable({
  data,
  onEdit,
  onDelete,
  loading = false,
}: ParticipationTableProps) {
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [deleting, setDeleting] = useState(false)

  const handleDelete = async () => {
    if (!deleteId) return
    try {
      setDeleting(true)
      await onDelete(deleteId)
      setDeleteId(null)
    } finally {
      setDeleting(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR')
  }

  if (!data || data.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-card p-8 text-center">
        <p className="text-muted-foreground">Nenhuma participação registrada.</p>
      </div>
    )
  }

  return (
    <>
      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted">
              <th className="px-6 py-3 text-left text-sm font-semibold">Evento</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Data</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Local</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Tipo</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Ações</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr
                key={item.id}
                className="border-b border-border hover:bg-muted/50 transition-colors"
              >
                <td className="px-6 py-3 text-sm">{item.evento}</td>
                <td className="px-6 py-3 text-sm">{formatDate(item.data)}</td>
                <td className="px-6 py-3 text-sm">{item.local}</td>
                <td className="px-6 py-3 text-sm">{item.tipo}</td>
                <td className="px-6 py-3 text-sm">
                  <StatusBadge status={item.participacao} />
                </td>
                <td className="px-6 py-3 text-sm space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onEdit(item)}
                    disabled={loading}
                  >
                    Editar
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => setDeleteId(item.id)}
                    disabled={loading || deleting}
                  >
                    Deletar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AlertDialog open={deleteId !== null} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Deletar Participação</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja deletar este registro? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={deleting}>
              {deleting ? 'Deletando...' : 'Deletar'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
