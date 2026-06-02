import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/hooks/useAuth'
import type { Participation, ParticipationInsert, ParticipationUpdate } from '@/types'

export function useParticipations() {
  const { user } = useAuth()
  const [participations, setParticipations] = useState<Participation[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadParticipations = async () => {
    if (!user?.id) {
      setParticipations([])
      return
    }

    try {
      setLoading(true)
      setError(null)
      const { data, error: err } = await supabase
        .from('participations')
        .select('*')
        .eq('user_id', user.id)
        .order('data', { ascending: false })

      if (err) throw err
      setParticipations(data || [])
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch participations'
      setError(errorMessage)
      setParticipations([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void loadParticipations()
  }, [user?.id])

  const refresh = async () => {
    await loadParticipations()
  }

  const create = async (participation: ParticipationInsert) => {
    if (!user?.id) {
      return { error: 'Usuário não autenticado' }
    }

    try {
      setLoading(true)
      setError(null)
      const { data, error: err } = await supabase
        .from('participations')
        .insert([
          {
            ...participation,
            user_id: user.id,
          },
        ])
        .select()
        .single()

      if (err) throw err

      setParticipations((prev) => [data, ...prev])
      return { data, error: null }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create participation'
      setError(errorMessage)
      return { data: null, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  const update = async (id: string, updates: ParticipationUpdate) => {
    try {
      setLoading(true)
      setError(null)
      const { data, error: err } = await supabase
        .from('participations')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (err) throw err

      setParticipations((prev) => prev.map((item) => (item.id === id ? data : item)))
      return { data, error: null }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update participation'
      setError(errorMessage)
      return { data: null, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  const remove = async (id: string) => {
    try {
      setLoading(true)
      setError(null)
      const { error: err } = await supabase
        .from('participations')
        .delete()
        .eq('id', id)

      if (err) throw err
      setParticipations((prev) => prev.filter((item) => item.id !== id))
      return { error: null }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete participation'
      setError(errorMessage)
      return { error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  return {
    participations,
    loading,
    error,
    refresh,
    create,
    update,
    remove,
  }
}
