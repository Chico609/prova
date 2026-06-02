import { Badge } from '@/components/ui/badge'
import type { ParticipacaoStatus } from '@/types'

interface StatusBadgeProps {
  status: ParticipacaoStatus
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const variants: Record<ParticipacaoStatus, 'default' | 'secondary' | 'destructive' | 'outline'> = {
    confirmado: 'default',
    pendente: 'secondary',
    ausente: 'destructive',
  }

  const labels: Record<ParticipacaoStatus, string> = {
    confirmado: 'Confirmado',
    pendente: 'Pendente',
    ausente: 'Ausente',
  }

  return <Badge variant={variants[status]}>{labels[status]}</Badge>
}
