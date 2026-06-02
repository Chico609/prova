import { useState, useEffect } from 'react'
import type { AuthSession, User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'

interface AuthState {
  user: User | null
  session: AuthSession | null
  loading: boolean
  error: string | null
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    session: null,
    loading: true,
    error: null,
  })

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
        setAuthState(prev => ({ ...prev, error: error.message, loading: false }))
      } else {
        setAuthState({
          user: session?.user ?? null,
          session: session ?? null,
          loading: false,
          error: null,
        })
      }
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setAuthState({
        user: session?.user ?? null,
        session: session ?? null,
        loading: false,
        error: null,
      })
    })

    return () => {
      subscription?.unsubscribe()
    }
  }, [])

  const signUp = async (email: string, password: string) => {
    try {
      setAuthState(prev => ({ ...prev, loading: true, error: null }))
      const { error } = await supabase.auth.signUp({
        email,
        password,
      })
      if (error) throw error
      setAuthState(prev => ({ ...prev, loading: false }))
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Sign up failed'
      setAuthState(prev => ({
        ...prev,
        loading: false,
        error: errorMessage,
      }))
      throw error
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      setAuthState(prev => ({ ...prev, loading: true, error: null }))
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) throw error
      setAuthState(prev => ({ ...prev, loading: false }))
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Sign in failed'
      setAuthState(prev => ({
        ...prev,
        loading: false,
        error: errorMessage,
      }))
      throw error
    }
  }

  const signOut = async () => {
    try {
      setAuthState(prev => ({ ...prev, loading: true, error: null }))
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      setAuthState({
        user: null,
        session: null,
        loading: false,
        error: null,
      })
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Sign out failed'
      setAuthState(prev => ({
        ...prev,
        loading: false,
        error: errorMessage,
      }))
      throw error
    }
  }

  const resetPassword = async (email: string) => {
    try {
      setAuthState(prev => ({ ...prev, loading: true, error: null }))
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      })
      if (error) throw error
      setAuthState(prev => ({ ...prev, loading: false }))
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Password reset failed'
      setAuthState(prev => ({
        ...prev,
        loading: false,
        error: errorMessage,
      }))
      throw error
    }
  }

  return {
    ...authState,
    signUp,
    signIn,
    signOut,
    resetPassword,
  }
}
