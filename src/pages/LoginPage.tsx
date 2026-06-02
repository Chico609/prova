import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { toast } from 'sonner'

export function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const { signIn, loading } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    try {
      await signIn(email, password)
      toast.success('Login efetuado com sucesso!')
      navigate('/dashboard')
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao fazer login'
      setError(errorMessage)
      toast.error(errorMessage)
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-background mx-auto px-4 sm:px-0">
      <Card className="w-full max-w-md sm:rounded-xl rounded-none shadow-md">
        <CardHeader className="space-y-2 text-center px-6 pt-6">
          <CardTitle className="text-2xl font-bold text-foreground">Controle DS</CardTitle>
          <CardDescription className="text-foreground">Gerenciar suas participações em eventos</CardDescription>
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
                placeholder="Sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                required
                className="bg-muted placeholder:text-muted-foreground rounded-full h-12 px-4"
              />
            </div>
            <Button type="submit" className="w-full rounded-full py-3" variant="default" disabled={loading}>
              {loading ? 'Entrando...' : 'Entrar'}
            </Button>
            <div className="space-y-2 text-sm text-center">
              <div>
                <span className="text-foreground/80">Não tem conta? </span>
                <Link to="/register" className="text-primary hover:underline font-medium">
                  Cadastre-se
                </Link>
              </div>
              <div>
                <Link to="/forgot-password" className="text-primary hover:underline font-medium">
                  Esqueceu sua senha?
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
