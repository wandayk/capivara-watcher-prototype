import { useState, FormEvent } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { User, Lock, AlertCircle, CheckCircle, ArrowLeft } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import { ROUTES } from '../utils/constants'
import { validarSenha } from '../utils/helpers'
import { Logo } from '../components/common/Logo'
import { ThemeToggle } from '../components/common/ThemeToggle'
import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'

export function ChangePassword() {
  const navigate = useNavigate()
  const { changePassword } = useAuth()

  const [formData, setFormData] = useState({
    username: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const validate = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.username.trim()) {
      newErrors.username = 'Usuário é obrigatório'
    }

    if (!formData.newPassword) {
      newErrors.newPassword = 'Nova senha é obrigatória'
    } else if (!validarSenha(formData.newPassword)) {
      newErrors.newPassword = 'Senha deve ter pelo menos 6 caracteres'
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirme a nova senha'
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'As senhas não coincidem'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!validate()) return

    setIsLoading(true)

    try {
      const success = await changePassword({
        username: formData.username,
        newPassword: formData.newPassword,
      })

      if (success) {
        setSuccess(true)
        setTimeout(() => {
          navigate(ROUTES.login)
        }, 2000)
      } else {
        setErrors({ general: 'Usuário não encontrado' })
      }
    } catch (err) {
      setErrors({ general: 'Erro ao alterar senha. Tente novamente.' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Limpa erro do campo ao digitar
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-light-bg via-light-bg to-brazil-green/5 dark:from-dark-bg dark:via-dark-bg dark:to-brazil-green/10 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full"
        >
          <Card padding="lg" className="text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-display text-light-text dark:text-dark-text mb-2">
              Senha alterada com sucesso!
            </h2>
            <p className="text-light-muted dark:text-dark-muted">
              Redirecionando para o login...
            </p>
          </Card>
        </motion.div>
      </div>
    )
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
          {/* Back Button */}
          <Link
            to={ROUTES.login}
            className="inline-flex items-center gap-2 text-sm text-brazil-green hover:text-brazil-green-dark mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para login
          </Link>

          {/* Logo */}
          <div className="flex justify-center mb-6">
            <Logo size="md" />
          </div>

          {/* Title */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-display text-light-text dark:text-dark-text mb-2">
              Trocar Senha
            </h1>
            <p className="text-sm text-light-muted dark:text-dark-muted">
              Digite seu usuário e escolha uma nova senha
            </p>
          </div>

          {/* General Error */}
          {errors.general && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-6 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center gap-2 text-red-700 dark:text-red-400"
            >
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm">{errors.general}</span>
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Usuário"
              type="text"
              placeholder="Digite seu usuário"
              value={formData.username}
              onChange={(e) => handleChange('username', e.target.value)}
              leftIcon={<User className="w-5 h-5" />}
              error={errors.username}
              disabled={isLoading}
            />

            <Input
              label="Nova Senha"
              type="password"
              placeholder="Digite a nova senha"
              value={formData.newPassword}
              onChange={(e) => handleChange('newPassword', e.target.value)}
              leftIcon={<Lock className="w-5 h-5" />}
              error={errors.newPassword}
              helperText="Mínimo 6 caracteres"
              disabled={isLoading}
            />

            <Input
              label="Confirmar Nova Senha"
              type="password"
              placeholder="Digite a senha novamente"
              value={formData.confirmPassword}
              onChange={(e) => handleChange('confirmPassword', e.target.value)}
              leftIcon={<Lock className="w-5 h-5" />}
              error={errors.confirmPassword}
              disabled={isLoading}
            />

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              isLoading={isLoading}
            >
              Alterar Senha
            </Button>
          </form>
        </Card>
      </motion.div>
    </div>
  )
}
