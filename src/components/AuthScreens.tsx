import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'

const SCREENS = { LOGIN: 'login', REGISTER: 'register', FORGOT: 'forgot', SUCCESS: 'success' } as const

const EyeIcon: React.FC<{ open?: boolean }> = ({ open }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {open ? (
      <>
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </>
    ) : (
      <>
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
        <line x1="1" y1="1" x2="23" y2="23" />
      </>
    )}
  </svg>
)

const Logo: React.FC = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '36px' }}>
    <div style={{
      width: '36px', height: '36px', borderRadius: '10px',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
    }}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M12 2L2 7l10 5 10-5-10-5z" fill="white" opacity="0.9"/>
        <path d="M2 17l10 5 10-5" stroke="white" strokeWidth="1.5" fill="none" opacity="0.7"/>
        <path d="M2 12l10 5 10-5" stroke="white" strokeWidth="1.5" fill="none"/>
      </svg>
    </div>
    <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '20px', fontWeight: '700', color: '#0f0f23', letterSpacing: '-0.3px' }}>
      Participações
    </span>
  </div>
)

const Divider: React.FC = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '20px 0' }}>
    <div style={{ flex: 1, height: '1px', background: '#e8e6f0' }} />
    <span style={{ fontSize: '12px', color: '#9994b0', fontFamily: 'system-ui', letterSpacing: '0.5px' }}>OU</span>
    <div style={{ flex: 1, height: '1px', background: '#e8e6f0' }} />
  </div>
)

const InputField: React.FC<any> = ({ label, type = 'text', placeholder, value, onChange, icon, rightEl }) => (
  <div style={{ marginBottom: '16px' }}>
    <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#3d3a52', marginBottom: '6px', fontFamily: 'system-ui' }}>
      {label}
    </label>
    <div style={{ position: 'relative' }}>
      {icon && (
        <div style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9994b0', pointerEvents: 'none' }}>
          {icon}
        </div>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={{
          width: '100%', height: '44px', padding: icon ? '0 40px 0 40px' : '0 40px 0 14px',
          border: '1.5px solid #e8e6f0', borderRadius: '10px',
          background: '#fafafa', fontSize: '14px', color: '#1a1a2e',
          fontFamily: 'system-ui', outline: 'none', boxSizing: 'border-box',
          transition: 'border-color 0.2s, box-shadow 0.2s',
        }}
        onFocus={e => { (e.target as HTMLInputElement).style.borderColor = '#6c63ff'; (e.target as HTMLInputElement).style.boxShadow = '0 0 0 3px rgba(108,99,255,0.1)'; (e.target as HTMLInputElement).style.background = '#fff'; }}
        onBlur={e => { (e.target as HTMLInputElement).style.borderColor = '#e8e6f0'; (e.target as HTMLInputElement).style.boxShadow = 'none'; (e.target as HTMLInputElement).style.background = '#fafafa'; }}
      />
      {rightEl && (
        <div style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)' }}>
          {rightEl}
        </div>
      )}
    </div>
  </div>
)

const PrimaryButton: React.FC<any> = ({ children, onClick, disabled, loading }) => (
  <button
    onClick={onClick}
    disabled={disabled || loading}
    style={{
      width: '100%', height: '46px', border: 'none', borderRadius: '10px',
      background: disabled ? '#c5c2e0' : 'linear-gradient(135deg, #6c63ff 0%, #5a52e0 100%)',
      color: 'white', fontSize: '14px', fontWeight: '600',
      fontFamily: 'system-ui', cursor: disabled ? 'not-allowed' : 'pointer',
      letterSpacing: '0.2px', transition: 'transform 0.15s, box-shadow 0.15s',
      boxShadow: disabled ? 'none' : '0 4px 14px rgba(108,99,255,0.35)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
    }}
    onMouseEnter={e => { if (!disabled) { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-1px)'; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 6px 20px rgba(108,99,255,0.45)'; }}}
    onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = ''; (e.currentTarget as HTMLButtonElement).style.boxShadow = disabled ? 'none' : '0 4px 14px rgba(108,99,255,0.35)'; }}
  >
    {loading ? (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" style={{ animation: 'spin 0.8s linear infinite' }}>
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
      </svg>
    ) : children}
  </button>
)

const SocialButton: React.FC<any> = ({ icon, label }) => (
  <button style={{
    flex: 1, height: '42px', border: '1.5px solid #e8e6f0', borderRadius: '10px',
    background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
    fontSize: '13px', fontWeight: '500', color: '#3d3a52', cursor: 'pointer', fontFamily: 'system-ui',
    transition: 'background 0.15s, border-color 0.15s'
  }}
    onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#f5f4ff'; (e.currentTarget as HTMLButtonElement).style.borderColor = '#c5c2e0'; }}
    onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'white'; (e.currentTarget as HTMLButtonElement).style.borderColor = '#e8e6f0'; }}
  >
    {icon}
    {label}
  </button>
)

const GoogleIcon: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
)

const GithubIcon: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="#1a1a2e">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
  </svg>
)

function LoginScreen({ onNavigate }: { onNavigate: (s: string) => void }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const { signIn } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = () => {
    if (!email || !password) return
    setLoading(true)
    ;(async () => {
      try {
        await signIn(email, password)
        navigate('/dashboard', { replace: true })
      } catch (err: any) {
        const msg = err instanceof Error ? err.message : 'Erro ao entrar'
        alert(msg)
      } finally {
        setLoading(false)
      }
    })()
  }

  return (
    <div>
      <Logo />
      <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '26px', fontWeight: '700', color: '#0f0f23', margin: '0 0 6px', letterSpacing: '-0.5px' }}>
        Bem-vindo de volta
      </h1>
      <p style={{ fontSize: '14px', color: '#9994b0', marginBottom: '28px', fontFamily: 'system-ui' }}>
        Entre para continuar na plataforma
      </p>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '4px' }}>
        <SocialButton icon={<GoogleIcon />} label="Google" />
        <SocialButton icon={<GithubIcon />} label="GitHub" />
      </div>

      <Divider />

      <InputField
        label="Email"
        type="email"
        placeholder="seu@email.com"
        value={email}
        onChange={e => setEmail(e.target.value)}
        icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>}
      />

      <InputField
        label="Senha"
        type={showPass ? 'text' : 'password'}
        placeholder="••••••••"
        value={password}
        onChange={e => setPassword(e.target.value)}
        icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>}
        rightEl={
          <button onClick={() => setShowPass(!showPass)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9994b0', padding: 0, display: 'flex', alignItems: 'center' }}>
            <EyeIcon open={showPass} />
          </button>
        }
      />

      <div style={{ textAlign: 'right', marginBottom: '20px', marginTop: '-8px' }}>
        <button onClick={() => onNavigate(SCREENS.FORGOT)} style={{ background: 'none', border: 'none', color: '#6c63ff', fontSize: '13px', cursor: 'pointer', fontFamily: 'system-ui', fontWeight: '500', padding: 0 }}>
          Esqueceu a senha?
        </button>
      </div>

      <PrimaryButton onClick={handleSubmit} loading={loading} disabled={!email || !password}>
        Entrar na conta
      </PrimaryButton>

      <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '13px', color: '#9994b0', fontFamily: 'system-ui' }}>
        Não tem uma conta?{' '}
        <button onClick={() => onNavigate(SCREENS.REGISTER)} style={{ background: 'none', border: 'none', color: '#6c63ff', fontWeight: '600', cursor: 'pointer', fontSize: '13px', fontFamily: 'system-ui', padding: 0 }}>
          Criar conta
        </button>
      </p>
    </div>
  )
}

function RegisterScreen({ onNavigate }: { onNavigate: (s: string) => void }) {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)

  const set = (k: string) => (e: any) => setForm({ ...form, [k]: e.target.value })
  const valid = form.name && form.email && form.password && form.confirm && form.password === form.confirm

  const handleSubmit = () => {
    if (!valid) return
    setLoading(true)
    setTimeout(() => { setLoading(false); onNavigate(SCREENS.LOGIN); }, 1800)
  }

  const strength = form.password.length === 0 ? 0 : form.password.length < 6 ? 1 : form.password.length < 10 ? 2 : 3
  const strengthColors = ['#e8e6f0', '#ff6b6b', '#f5a623', '#22c55e']
  const strengthLabels = ['', 'Fraca', 'Média', 'Forte']

  return (
    <div>
      <Logo />
      <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '26px', fontWeight: '700', color: '#0f0f23', margin: '0 0 6px', letterSpacing: '-0.5px' }}>
        Criar sua conta
      </h1>
      <p style={{ fontSize: '14px', color: '#9994b0', marginBottom: '24px', fontFamily: 'system-ui' }}>
        Registre-se gratuitamente e comece agora
      </p>

      <InputField label="Nome completo" placeholder="Seu nome" value={form.name} onChange={set('name')}
        icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>}
      />
      <InputField label="Email" type="email" placeholder="seu@email.com" value={form.email} onChange={set('email')}
        icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>}
      />
      <InputField label="Senha" type={showPass ? 'text' : 'password'} placeholder="Mín. 8 caracteres" value={form.password} onChange={set('password')}
        icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>}
        rightEl={
          <button onClick={() => setShowPass(!showPass)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9994b0', padding: 0, display: 'flex', alignItems: 'center' }}>
            <EyeIcon open={showPass} />
          </button>
        }
      />

      {form.password && (
        <div style={{ marginTop: '-10px', marginBottom: '14px' }}>
          <div style={{ display: 'flex', gap: '4px', marginBottom: '4px' }}>
            {[1, 2, 3].map(i => (
              <div key={i} style={{ flex: 1, height: '3px', borderRadius: '2px', background: strength >= i ? strengthColors[strength] : '#e8e6f0', transition: 'background 0.3s' }} />
            ))}
          </div>
          <span style={{ fontSize: '11px', color: strengthColors[strength], fontFamily: 'system-ui', fontWeight: '500' }}>
            {strengthLabels[strength]}
          </span>
        </div>
      )}

      <InputField label="Confirmar senha" type="password" placeholder="Repita a senha" value={form.confirm} onChange={set('confirm')}
        icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>}
      />

      {form.confirm && form.password !== form.confirm && (
        <p style={{ fontSize: '12px', color: '#ff6b6b', fontFamily: 'system-ui', marginTop: '-10px', marginBottom: '12px' }}>As senhas não coincidem</p>
      )}

      <PrimaryButton onClick={handleSubmit} loading={loading} disabled={!valid}>
        Criar conta grátis
      </PrimaryButton>

      <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '13px', color: '#9994b0', fontFamily: 'system-ui' }}>
        Já tem conta?{' '}
        <button onClick={() => onNavigate(SCREENS.LOGIN)} style={{ background: 'none', border: 'none', color: '#6c63ff', fontWeight: '600', cursor: 'pointer', fontSize: '13px', fontFamily: 'system-ui', padding: 0 }}>
          Fazer login
        </button>
      </p>
    </div>
  )
}

function ForgotScreen({ onNavigate }: { onNavigate: (s: string) => void }) {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = () => {
    if (!email) return
    setLoading(true)
    setTimeout(() => { setLoading(false); setSent(true); }, 1600)
  }

  return (
    <div>
      <Logo />

      {!sent ? (
        <>
          <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: 'linear-gradient(135deg, #f0edff 0%, #e8e4ff 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6c63ff" strokeWidth="2" strokeLinecap="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
          </div>

          <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '26px', fontWeight: '700', color: '#0f0f23', margin: '0 0 8px', letterSpacing: '-0.5px' }}>
            Esqueceu sua senha?
          </h1>
          <p style={{ fontSize: '14px', color: '#9994b0', marginBottom: '28px', fontFamily: 'system-ui', lineHeight: '1.6' }}>
            Sem problemas. Digite seu email e enviaremos um link para criar uma nova senha.
          </p>

          <InputField label="Email cadastrado" type="email" placeholder="seu@email.com" value={email} onChange={e => setEmail(e.target.value)}
            icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>}
          />

          <PrimaryButton onClick={handleSubmit} loading={loading} disabled={!email}>
            Enviar link de redefinição
          </PrimaryButton>
        </>
      ) : (
        <div style={{ textAlign: 'center', padding: '10px 0' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </div>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '22px', fontWeight: '700', color: '#0f0f23', margin: '0 0 10px', letterSpacing: '-0.3px' }}>
            Email enviado!
          </h2>
          <p style={{ fontSize: '14px', color: '#9994b0', marginBottom: '28px', fontFamily: 'system-ui', lineHeight: '1.6' }}>
            Verifique sua caixa de entrada em <strong style={{ color: '#3d3a52' }}>{email}</strong> e siga as instruções para redefinir sua senha.
          </p>
          <div style={{ background: '#fafafa', border: '1.5px solid #e8e6f0', borderRadius: '10px', padding: '14px 16px', marginBottom: '24px', textAlign: 'left' }}>
            <p style={{ fontSize: '12px', color: '#9994b0', fontFamily: 'system-ui', margin: 0, lineHeight: '1.6' }}>
              💡 O link expira em <strong style={{ color: '#3d3a52' }}>30 minutos</strong>. Não encontrou? Verifique o spam.
            </p>
          </div>
          <button onClick={() => { setSent(false); setEmail(''); }} style={{ background: 'none', border: '1.5px solid #e8e6f0', color: '#3d3a52', fontSize: '13px', cursor: 'pointer', fontFamily: 'system-ui', fontWeight: '500', padding: '10px 20px', borderRadius: '10px', marginBottom: '12px', width: '100%', transition: 'background 0.15s' }}
            onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.background = '#f5f4ff'}
            onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.background = 'none'}
          >
            Reenviar email
          </button>
        </div>
      )}

      <p style={{ textAlign: 'center', marginTop: '16px', fontSize: '13px', color: '#9994b0', fontFamily: 'system-ui' }}>
        Lembrou a senha?{' '}
        <button onClick={() => onNavigate(SCREENS.LOGIN)} style={{ background: 'none', border: 'none', color: '#6c63ff', fontWeight: '600', cursor: 'pointer', fontSize: '13px', fontFamily: 'system-ui', padding: 0 }}>
          Voltar ao login
        </button>
      </p>
    </div>
  )
}

export default function AuthScreens({ initialScreen }: { initialScreen?: 'login'|'register'|'forgot'|'success' }) {
  const [screen, setScreen] = useState<string>(initialScreen || SCREENS.LOGIN)

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap');
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        input::placeholder { color: #c0bdd4; }
      `}</style>
      <div style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'linear-gradient(145deg, #f8f7ff 0%, #f0eeff 40%, #fdf6ff 100%)',
        padding: '20px', position: 'relative', overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(108,99,255,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-60px', left: '-60px', width: '250px', height: '250px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(108,99,255,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div style={{
          width: '100%', maxWidth: '420px', background: 'white',
          borderRadius: '20px', padding: '36px 36px 32px',
          boxShadow: '0 20px 60px rgba(108,99,255,0.1), 0 2px 8px rgba(0,0,0,0.04)',
          border: '1px solid rgba(108,99,255,0.08)',
          animation: 'fadeIn 0.4s ease-out',
          position: 'relative', zIndex: 1
        }}>
          {screen === SCREENS.LOGIN && <LoginScreen onNavigate={(s) => setScreen(s)} />}
          {screen === SCREENS.REGISTER && <RegisterScreen onNavigate={(s) => setScreen(s)} />}
          {screen === SCREENS.FORGOT && <ForgotScreen onNavigate={(s) => setScreen(s)} />}
        </div>
      </div>
    </>
  )
}
