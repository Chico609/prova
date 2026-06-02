import { useEffect, useState } from 'react'
import type { Participation, ParticipacaoStatus } from '@/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface ParticipationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  participation?: Participation
  onSubmit: (data: {
    evento: string
    data: string
    local: string
    tipo: string
    participacao: ParticipacaoStatus
  }) => Promise<void>
  loading?: boolean
}

export function ParticipationDialog({
  open,
  onOpenChange,
  participation,
  onSubmit,
  loading = false,
}: ParticipationDialogProps) {
  const [formData, setFormData] = useState({
    evento: '',
    data: '',
    local: '',
    tipo: '',
    participacao: 'pendente' as ParticipacaoStatus,
  })

  useEffect(() => {
    if (participation) {
      setFormData({
        evento: participation.evento,
        data: participation.data,
        local: participation.local,
        tipo: participation.tipo,
        participacao: participation.participacao,
      })
    } else {
      setFormData({
        evento: '',
        data: '',
        local: '',
        tipo: '',
        participacao: 'pendente',
      })
    }
  }, [participation, open])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await onSubmit(formData)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {participation ? 'Editar Participação' : 'Nova Participação'}
          </DialogTitle>
          <DialogDescription>
            {participation
              ? 'Edite os detalhes da participação'
              : 'Crie um novo registro de participação em um evento'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium">Evento</label>
            <Input
              placeholder="Nome do evento"
              value={formData.evento}
              onChange={(e) => setFormData({ ...formData, evento: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium">Data</label>
            <Input
              type="date"
              value={formData.data}
              onChange={(e) => setFormData({ ...formData, data: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium">Local</label>
            <Input
              placeholder="Local do evento"
              value={formData.local}
              onChange={(e) => setFormData({ ...formData, local: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium">Tipo</label>
            <Input
              placeholder="Tipo de evento"
              value={formData.tipo}
              onChange={(e) => setFormData({ ...formData, tipo: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium">Participação</label>
            <Select
              value={formData.participacao}
              onValueChange={(value) =>
                setFormData({ ...formData, participacao: value as ParticipacaoStatus })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="confirmado">Confirmado</SelectItem>
                <SelectItem value="pendente">Pendente</SelectItem>
                <SelectItem value="ausente">Ausente</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Salvando...' : 'Salvar'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
