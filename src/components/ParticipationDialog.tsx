import { useState, useEffect, type ElementType } from 'react'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useParticipations } from '@/hooks/useParticipations'
import type { Participation, ParticipationInsert, ParticipacaoStatus } from '@/types'
import { toast } from 'sonner'
import {
  Loader2,
  CalendarDays,
  MapPin,
  Tag,
  Pencil,
  Plus,
  CheckCircle,
  Clock,
  XCircle,
} from 'lucide-react'

interface ParticipationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  record?: Participation | null
}

const emptyForm: ParticipationInsert = {
  evento: '',
  data: '',
  local: '',
  tipo: '',
  participacao: 'pendente',
}

const statusOptions: {
  value: ParticipacaoStatus
  label: string
  icon: ElementType
  color: string
}[] = [
  {
    value: 'confirmado',
    label: 'Confirmado',
    icon: CheckCircle,
    color: 'text-emerald-600',
  },
  {
    value: 'pendente',
    label: 'Pendente',
    icon: Clock,
    color: 'text-amber-600',
  },
  {
    value: 'ausente',
    label: 'Ausente',
    icon: XCircle,
    color: 'text-red-500',
  },
]

export function ParticipationDialog({
  open,
  onOpenChange,
  record,
}: ParticipationDialogProps) {
  const { create, update } = useParticipations()
  const [form, setForm] = useState<ParticipationInsert>(emptyForm)
  const [submitting, setSubmitting] = useState(false)

  const isEditing = Boolean(record)

  useEffect(() => {
    if (record) {
      setForm({
        evento: record.evento,
        data: record.data,
        local: record.local,
        tipo: record.tipo,
        participacao: record.participacao,
      })
    } else {
      setForm(emptyForm)
    }
  }, [record, open])

  const handleChange = (field: keyof ParticipationInsert, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!form.evento.trim() || !form.data || !form.local.trim() || !form.tipo.trim()) {
      toast.error('Preencha todos os campos obrigatórios.')
      return
    }

    setSubmitting(true)

    if (isEditing && record) {
      const { error } = await update(record.id, form)
      if (error) {
        toast.error(`Erro ao atualizar: ${error}`)
      } else {
        toast.success('Participação atualizada!')
        onOpenChange(false)
      }
    } else {
      const { error } = await create(form)
      if (error) {
        toast.error(`Erro ao criar: ${error}`)
      } else {
        toast.success('Participação criada com sucesso!')
        onOpenChange(false)
      }
    }

    setSubmitting(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="gap-0 overflow-hidden p-0 sm:max-w-[520px]">
        <div className="bg-gradient-to-r from-violet-600 to-purple-600 px-4 py-4 sm:px-6 sm:py-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
              {isEditing ? <Pencil className="h-4 w-4 text-white" /> : <Plus className="h-4 w-4 text-white" />}
            </div>
            <div>
              <DialogTitle className="text-base font-bold text-white">
                {isEditing ? 'Editar Participação' : 'Nova Participação'}
              </DialogTitle>
              <DialogDescription className="mt-0.5 text-sm text-violet-200">
                {isEditing
                  ? 'Atualize os dados do registro abaixo.'
                  : 'Crie um novo registro de participação em um evento.'}
              </DialogDescription>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-5 px-4 py-5 sm:px-6 sm:py-6">
            <div className="space-y-2">
              <Label
                htmlFor="evento"
                className="flex items-center gap-1.5 text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                <Tag className="h-3.5 w-3.5 text-violet-500" />
                Nome do Evento
              </Label>
              <Input
                id="evento"
                placeholder="Ex: React Summit 2025"
                value={form.evento}
                onChange={(e) => handleChange('evento', e.target.value)}
                disabled={submitting}
                className="border-slate-200 bg-slate-50 focus:border-violet-400 focus:ring-violet-400 dark:border-slate-700 dark:bg-slate-800"
              />
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label
                  htmlFor="data"
                  className="flex items-center gap-1.5 text-sm font-medium text-slate-700 dark:text-slate-300"
                >
                  <CalendarDays className="h-3.5 w-3.5 text-violet-500" />
                  Data
                </Label>
                <Input
                  id="data"
                  type="date"
                  value={form.data}
                  onChange={(e) => handleChange('data', e.target.value)}
                  disabled={submitting}
                  className="border-slate-200 bg-slate-50 focus:border-violet-400 focus:ring-violet-400 dark:border-slate-700 dark:bg-slate-800"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="local"
                  className="flex items-center gap-1.5 text-sm font-medium text-slate-700 dark:text-slate-300"
                >
                  <MapPin className="h-3.5 w-3.5 text-violet-500" />
                  Local
                </Label>
                <Input
                  id="local"
                  placeholder="Ex: São Paulo, SP"
                  value={form.local}
                  onChange={(e) => handleChange('local', e.target.value)}
                  disabled={submitting}
                  className="border-slate-200 bg-slate-50 focus:border-violet-400 focus:ring-violet-400 dark:border-slate-700 dark:bg-slate-800"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="tipo"
                className="flex items-center gap-1.5 text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                <Tag className="h-3.5 w-3.5 text-violet-500" />
                Tipo de Evento
              </Label>
              <Input
                id="tipo"
                placeholder="Ex: Conferência, Workshop, Meetup..."
                value={form.tipo}
                onChange={(e) => handleChange('tipo', e.target.value)}
                disabled={submitting}
                className="border-slate-200 bg-slate-50 focus:border-violet-400 focus:ring-violet-400 dark:border-slate-700 dark:bg-slate-800"
              />
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-1.5 text-sm font-medium text-slate-700 dark:text-slate-300">
                Status de Participação
              </Label>
              <div className="grid grid-cols-3 gap-2">
                {statusOptions.map((opt) => {
                  const Icon = opt.icon
                  const isSelected = form.participacao === opt.value
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      disabled={submitting}
                      onClick={() => handleChange('participacao', opt.value)}
                      className={`flex flex-col items-center gap-1.5 rounded-xl border-2 px-2 py-3 text-xs font-medium transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 ${
                        isSelected
                          ? 'border-violet-500 bg-violet-50 text-violet-700 shadow-sm dark:bg-violet-950/40 dark:text-violet-300'
                          : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:border-slate-600'
                      }`}
                    >
                      <Icon className={`h-4 w-4 ${isSelected ? 'text-violet-500' : opt.color}`} />
                      {opt.label}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 border-t border-slate-100 bg-slate-50/80 px-6 py-4 dark:border-slate-800 dark:bg-slate-900/50">
            <Button
              type="button"
              variant="ghost"
              onClick={() => onOpenChange(false)}
              disabled={submitting}
              className="text-slate-600 hover:text-slate-900"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={submitting}
              className="gap-2 bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-md shadow-violet-500/25 hover:from-violet-700 hover:to-purple-700"
            >
              {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : isEditing ? <Pencil className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
              {isEditing ? 'Salvar alterações' : 'Criar participação'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
