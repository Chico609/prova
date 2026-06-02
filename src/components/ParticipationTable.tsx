import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { StatusBadge } from '@/components/StatusBadge'
import { ParticipationDialog } from '@/components/ParticipationDialog'
import { useParticipations } from '@/hooks/useParticipations'
import type { Participation } from '@/types'
import { toast } from 'sonner'
import { Pencil, Trash2, Loader2, CalendarX } from 'lucide-react'

function formatDate(dateString: string): string {
  const [year, month, day] = dateString.split('-')
  return `${day}/${month}/${year}`
}

export function ParticipationTable() {
  const { participations, loading, remove } = useParticipations()

  const [editRecord, setEditRecord] = useState<Participation | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<Participation | null>(null)
  const [alertOpen, setAlertOpen] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const handleEdit = (record: Participation) => {
    setEditRecord(record)
    setDialogOpen(true)
  }

  const handleDialogClose = (open: boolean) => {
    setDialogOpen(open)
    if (!open) setEditRecord(null)
  }

  const handleDeleteClick = (record: Participation) => {
    setDeleteTarget(record)
    setAlertOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return
    setDeleting(true)
    const { error } = await remove(deleteTarget.id)
    if (error) {
      toast.error(`Erro ao excluir: ${error}`)
    } else {
      toast.success('Participação excluída.')
    }
    setDeleting(false)
    setAlertOpen(false)
    setDeleteTarget(null)
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-16 text-slate-400">
        <Loader2 className="h-8 w-8 animate-spin" />
        <p className="text-sm">Carregando registros...</p>
      </div>
    )
  }

  if (participations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed border-slate-200 py-16 text-center dark:border-slate-700">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800">
          <CalendarX className="h-7 w-7 text-slate-400" />
        </div>
        <div>
          <p className="font-semibold text-slate-700 dark:text-slate-300">Nenhuma participação ainda</p>
          <p className="mt-1 text-sm text-slate-400">
            Clique em "Nova Participação" para adicionar seu primeiro registro.
          </p>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="overflow-x-auto rounded-xl border border-slate-100 dark:border-slate-800">
        <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800/50">
              <th className="whitespace-nowrap px-6 py-3 text-left text-sm font-semibold text-slate-600 dark:text-slate-400">Evento</th>
              <th className="whitespace-nowrap px-6 py-3 text-left text-sm font-semibold text-slate-600 dark:text-slate-400">Data</th>
              <th className="whitespace-nowrap px-6 py-3 text-left text-sm font-semibold text-slate-600 dark:text-slate-400">Local</th>
              <th className="whitespace-nowrap px-6 py-3 text-left text-sm font-semibold text-slate-600 dark:text-slate-400">Tipo</th>
              <th className="whitespace-nowrap px-6 py-3 text-left text-sm font-semibold text-slate-600 dark:text-slate-400">Status</th>
              <th className="whitespace-nowrap px-6 py-3 text-right text-sm font-semibold text-slate-600 dark:text-slate-400">Ações</th>
            </tr>
          </thead>
          <tbody>
            {participations.map((record, index) => (
              <tr
                key={record.id}
                className={`transition-colors hover:bg-violet-50/50 dark:hover:bg-violet-950/10 ${index % 2 === 0 ? '' : 'bg-slate-50/50 dark:bg-slate-800/20'}`}
              >
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-slate-900 dark:text-white">{record.evento}</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{formatDate(record.data)}</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{record.local}</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm">
                  <span className="inline-flex items-center rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                    {record.tipo}
                  </span>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm">
                  <StatusBadge status={record.participacao} />
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-right text-sm">
                  <div className="flex items-center justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(record)}
                      aria-label="Editar"
                      className="h-8 w-8 text-slate-400 hover:bg-violet-50 hover:text-violet-600 dark:hover:bg-violet-950/30"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteClick(record)}
                      aria-label="Excluir"
                      className="h-8 w-8 text-slate-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ParticipationDialog open={dialogOpen} onOpenChange={handleDialogClose} record={editRecord} />

      <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
        <AlertDialogContent className="sm:max-w-[400px]">
          <AlertDialogHeader>
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-950/30">
              <Trash2 className="h-5 w-5 text-red-600 dark:text-red-400" />
            </div>
            <AlertDialogTitle className="text-center">Excluir participação?</AlertDialogTitle>
            <AlertDialogDescription className="text-center">
              Tem certeza que deseja excluir{' '}
              <strong className="text-slate-800 dark:text-slate-200">"{deleteTarget?.evento}"</strong>?
              Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="sm:justify-center">
            <AlertDialogCancel disabled={deleting}>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              disabled={deleting}
              className="gap-2 bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500"
            >
              {deleting && <Loader2 className="h-4 w-4 animate-spin" />}
              Sim, excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
