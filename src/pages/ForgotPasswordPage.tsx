import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { toast } from 'sonner'

export function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const { resetPassword, loading } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)

    try {
      await resetPassword(email)
      setSuccess(true)
      toast.success('E-mail de recuperação enviado! Verifique sua caixa de entrada.')
      setEmail('')
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao enviar e-mail'
      setError(errorMessage)
      toast.error(errorMessage)
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-background mx-auto px-4 sm:px-0">
      <Card className="w-full max-w-md sm:rounded-xl rounded-none shadow-md">
        <CardHeader className="space-y-2 text-center px-6 pt-6">
          <CardTitle className="text-2xl font-bold text-foreground">Recuperar Senha</CardTitle>
          <CardDescription className="text-foreground">Digite seu e-mail para receber um link de recuperação</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4 px-6 pb-6">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {success && (
              <Alert>
                <AlertDescription className="text-foreground">
                  Verifique seu e-mail para o link de recuperação de senha.
                </AlertDescription>
              </Alert>
            )}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                required
                className="bg-muted placeholder:text-muted-foreground rounded-full h-12 px-4"
              />
            </div>
            <Button type="submit" className="w-full rounded-full py-3" variant="default" disabled={loading}>
              {loading ? 'Enviando...' : 'Enviar Link de Recuperação'}
            </Button>
            <div className="text-center text-sm">
              <Link to="/login" className="text-primary hover:underline font-medium">
                Voltar para o login
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
