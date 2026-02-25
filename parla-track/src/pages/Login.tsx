import { useState, FormEvent } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Lock, User, AlertCircle } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import { ROUTES } from '../utils/constants'
import { Logo } from '../components/common/Logo'
import { ThemeToggle } from '../components/common/ThemeToggle'
import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'

export function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')

    if (!username || !password) {
      setError('Preencha todos os campos')
      return
    }

    setIsLoading(true)

    try {
      const success = await login({ username, password })

      if (success) {
        navigate(`${ROUTES.redirecting}?to=${ROUTES.home}`)
      } else {
        setError('Credenciais inválidas')
      }
    } catch (err) {
      setError('Erro ao fazer login. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-light-bg via-light-bg to-brazil-green/5 dark:from-dark-bg dark:via-dark-bg dark:to-brazil-green/10 flex items-center justify-center px-4 py-8">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(45deg, #009B3A 0, #009B3A 1px, transparent 1px, transparent 20px)`
        }} />
      </div>

      {/* Theme Toggle */}
      <div className="absolute top-4 right-4 z-10">
        <ThemeToggle />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full relative z-10"
      >
        <Card padding="lg" className="shadow-2xl">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <Logo size="lg" />
          </div>

          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-display text-light-text dark:text-dark-text mb-2">
              Bem-vindo
            </h1>
            <p className="text-light-muted dark:text-dark-muted">
              Acompanhe parlamentares brasileiros
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-6 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center gap-2 text-red-700 dark:text-red-400"
            >
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm">{error}</span>
            </motion.div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Usuário"
              type="text"
              placeholder="Digite seu usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              leftIcon={<User className="w-5 h-5" />}
              disabled={isLoading}
              autoComplete="username"
            />

            <Input
              label="Senha"
              type="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              leftIcon={<Lock className="w-5 h-5" />}
              disabled={isLoading}
              autoComplete="current-password"
            />

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              isLoading={isLoading}
            >
              Entrar
            </Button>
          </form>

          {/* Links */}
          <div className="mt-6 space-y-3">
            <div className="text-center">
              <Link
                to={ROUTES.changePassword}
                className="text-sm text-brazil-green hover:text-brazil-green-dark transition-colors"
              >
                Esqueceu a senha?
              </Link>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-light-border dark:border-dark-border" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-light-card dark:bg-dark-card text-light-muted dark:text-dark-muted">
                  Não tem conta?
                </span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              size="md"
              fullWidth
              onClick={() => navigate(ROUTES.createAccount)}
            >
              Criar conta
            </Button>
          </div>

          {/* Default Credentials Hint */}
          <div className="mt-6 p-3 bg-brazil-green/5 dark:bg-brazil-green/10 border border-brazil-green/20 rounded-lg">
            <p className="text-xs text-center text-light-muted dark:text-dark-muted">
              <strong>Dica:</strong> Use <code className="px-1 py-0.5 bg-brazil-green/10 rounded">pucminas</code> / <code className="px-1 py-0.5 bg-brazil-green/10 rounded">pucminas</code>
            </p>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}
