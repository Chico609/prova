import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { toast } from 'sonner'

export function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const { signUp, loading } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (password !== confirmPassword) {
      const errorMessage = 'As senhas não coincidem'
      setError(errorMessage)
      toast.error(errorMessage)
      return
    }

    try {
      await signUp(email, password)
      toast.success('Cadastro realizado! Verifique seu e-mail para confirmar.')
      navigate('/login')
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao fazer cadastro'
      setError(errorMessage)
      toast.error(errorMessage)
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-background mx-auto px-4 sm:px-0">
      <Card className="w-full max-w-md sm:rounded-xl rounded-none shadow-md">
        <CardHeader className="space-y-2 text-center px-6 pt-6">
          <CardTitle className="text-2xl font-bold text-foreground">Cadastro</CardTitle>
          <CardDescription className="text-foreground">Crie sua conta no Controle DS</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4 px-6 pb-6">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
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
            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="Escolha uma senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                required
                className="bg-muted placeholder:text-muted-foreground rounded-full h-12 px-4"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-foreground">Confirmar Senha</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirme sua senha"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={loading}
                required
                className="bg-muted placeholder:text-muted-foreground rounded-full h-12 px-4"
              />
            </div>
            <Button type="submit" className="w-full rounded-full py-3" variant="default" disabled={loading}>
              {loading ? 'Cadastrando...' : 'Cadastrar'}
            </Button>
            <div className="text-center text-sm">
              <span className="text-foreground/80">Já tem conta? </span>
              <Link to="/login" className="text-primary hover:underline font-medium">
                Faça login
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
