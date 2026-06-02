export type ParticipacaoStatus = 'confirmado' | 'pendente' | 'ausente'

export interface Participation {
  id: string
  user_id: string
  evento: string
  data: string
  local: string
  tipo: string
  participacao: ParticipacaoStatus
  created_at: string
  updated_at: string
}

export type ParticipationInsert = Omit<Participation, 'id' | 'user_id' | 'created_at' | 'updated_at'>
export type ParticipationUpdate = Partial<ParticipationInsert>
