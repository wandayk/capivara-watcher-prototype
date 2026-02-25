import { useState, FormEvent } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { User, Mail, Lock, AlertCircle, CheckCircle, ArrowLeft } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import { ROUTES } from '../utils/constants'
import { validarEmail, validarSenha } from '../utils/helpers'
import { Logo } from '../components/common/Logo'
import { Input } from '@/components/ui/InputWithIcon'
import { Button } from '@/components/ui/ButtonCompat'
import { Card } from '@/components/ui/CardWithPadding'

export function CreateAccount() {
  const navigate = useNavigate()
  const { register } = useAuth()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const validate = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório'
    } else if (!validarEmail(formData.email)) {
      newErrors.email = 'Email inválido'
    }

    if (!formData.username.trim()) {
      newErrors.username = 'Usuário é obrigatório'
    } else if (formData.username.length < 3) {
      newErrors.username = 'Usuário deve ter pelo menos 3 caracteres'
    }

    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória'
    } else if (!validarSenha(formData.password)) {
      newErrors.password = 'Senha deve ter pelo menos 6 caracteres'
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirme a senha'
    } else if (formData.password !== formData.confirmPassword) {
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
      const success = await register({
        name: formData.name,
        email: formData.email,
        username: formData.username,
        password: formData.password,
      })

      if (success) {
        setSuccess(true)
        setTimeout(() => {
          navigate(`${ROUTES.redirecting}?to=${ROUTES.login}`)
        }, 2000)
      } else {
        setErrors({ general: 'Usuário ou email já existe' })
      }
    } catch (err) {
      setErrors({ general: 'Erro ao criar conta. Tente novamente.' })
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
              Conta criada com sucesso!
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
              Criar Conta
            </h1>
            <p className="text-sm text-light-muted dark:text-dark-muted">
              Preencha os dados para começar
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
              label="Nome Completo"
              type="text"
              placeholder="Digite seu nome"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              leftIcon={<User className="w-5 h-5" />}
              error={errors.name}
              disabled={isLoading}
            />

            <Input
              label="Email"
              type="email"
              placeholder="seu@email.com"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              leftIcon={<Mail className="w-5 h-5" />}
              error={errors.email}
              disabled={isLoading}
            />

            <Input
              label="Usuário"
              type="text"
              placeholder="Escolha um usuário"
              value={formData.username}
              onChange={(e) => handleChange('username', e.target.value)}
              leftIcon={<User className="w-5 h-5" />}
              error={errors.username}
              helperText="Mínimo 3 caracteres"
              disabled={isLoading}
            />

            <Input
              label="Senha"
              type="password"
              placeholder="Escolha uma senha"
              value={formData.password}
              onChange={(e) => handleChange('password', e.target.value)}
              leftIcon={<Lock className="w-5 h-5" />}
              error={errors.password}
              helperText="Mínimo 6 caracteres"
              disabled={isLoading}
            />

            <Input
              label="Confirmar Senha"
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
              Criar Conta
            </Button>
          </form>
        </Card>
      </motion.div>
    </div>
  )
}
