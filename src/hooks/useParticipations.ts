import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { Participation, ParticipationInsert, ParticipationUpdate } from '@/types'

export function useParticipations() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const getParticipations = async (userId: string): Promise<Participation[]> => {
    try {
      setLoading(true)
      setError(null)
      const { data, error: err } = await supabase
        .from('participations')
        .select('*')
        .eq('user_id', userId)
        .order('data', { ascending: false })
      
      if (err) throw err
      return data || []
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch participations'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const createParticipation = async (
    userId: string,
    participation: ParticipationInsert
  ): Promise<Participation> => {
    try {
      setLoading(true)
      setError(null)
      const { data, error: err } = await supabase
        .from('participations')
        .insert([
          {
            ...participation,
            user_id: userId,
          },
        ])
        .select()
        .single()

      if (err) throw err
      return data
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create participation'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const updateParticipation = async (
    id: string,
    updates: ParticipationUpdate
  ): Promise<Participation> => {
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
      return data
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update participation'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const deleteParticipation = async (id: string): Promise<void> => {
    try {
      setLoading(true)
      setError(null)
      const { error: err } = await supabase
        .from('participations')
        .delete()
        .eq('id', id)

      if (err) throw err
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete participation'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    error,
    getParticipations,
    createParticipation,
    updateParticipation,
    deleteParticipation,
  }
}
