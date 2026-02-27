import { Mail, Phone, MapPin, Calendar, GraduationCap, Trash2, Building } from 'lucide-react'
import { motion } from 'framer-motion'
import { Parlamentar } from '../../types'
import { useParlamentares } from '../../hooks/useParlamentares'
import { Card } from '@/components/ui/CardWithPadding'
import { Button } from '@/components/ui/ButtonCompat'
import { Avatar } from '@/components/ui/AvatarWithImage'
import { PARTIDO_CORES } from '../../utils/constants'
import { formatarData, obterIniciais } from '../../utils/helpers'

interface ParlamentarDetailProps {
  parlamentar: Parlamentar
}

export function ParlamentarDetail({ parlamentar }: ParlamentarDetailProps) {
  const { removeParlamentar } = useParlamentares()
  const corPartido = PARTIDO_CORES[parlamentar.partido] || '#808080'

  const handleRemove = () => {
    if (confirm(`Deseja remover ${parlamentar.nome} da sua lista?`)) {
      removeParlamentar(parlamentar.id)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Hero Section */}
      <motion.div variants={itemVariants} id="hero">
        <Card padding="lg">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <Avatar
                src={parlamentar.foto}
                alt={parlamentar.nome}
                size="xl"
                fallback={obterIniciais(parlamentar.nome)}
              />
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-display text-light-text dark:text-dark-text mb-2">
                    {parlamentar.nome}
                  </h1>
                  <div className="flex flex-wrap items-center gap-3 text-sm">
                    <span
                      className="px-3 py-1 rounded-full font-semibold text-white"
                      style={{ backgroundColor: corPartido }}
                    >
                      {parlamentar.partido}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text font-semibold">
                      {parlamentar.uf}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-brazil-green/10 text-brazil-green font-semibold capitalize">
                      {parlamentar.tipo}
                    </span>
                  </div>
                </div>

                <Button
                  variant="danger"
                  size="sm"
                  onClick={handleRemove}
                  title="Remover da lista"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              {parlamentar.nomeCivil && parlamentar.nomeCivil !== parlamentar.nome && (
                <p className="text-sm text-light-muted dark:text-dark-muted mt-3">
                  Nome civil: {parlamentar.nomeCivil}
                </p>
              )}
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Contact Info */}
      {(parlamentar.email || parlamentar.telefone) && (
        <motion.div variants={itemVariants} id="contato">
          <Card padding="lg">
            <h2 className="text-xl font-display text-light-text dark:text-dark-text mb-4">
              Contato
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {parlamentar.email && (
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-brazil-green/10 rounded-lg">
                    <Mail className="w-5 h-5 text-brazil-green" />
                  </div>
                  <div>
                    <p className="text-xs text-light-muted dark:text-dark-muted">Email</p>
                    <a
                      href={`mailto:${parlamentar.email}`}
                      className="text-sm text-light-text dark:text-dark-text hover:text-brazil-green transition-colors"
                    >
                      {parlamentar.email}
                    </a>
                  </div>
                </div>
              )}

              {parlamentar.telefone && (
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-brazil-green/10 rounded-lg">
                    <Phone className="w-5 h-5 text-brazil-green" />
                  </div>
                  <div>
                    <p className="text-xs text-light-muted dark:text-dark-muted">Telefone</p>
                    <p className="text-sm text-light-text dark:text-dark-text">
                      {parlamentar.telefone}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </motion.div>
      )}

      {/* Personal Data */}
      <motion.div variants={itemVariants} id="dados-pessoais">
        <Card padding="lg">
          <h2 className="text-xl font-display text-light-text dark:text-dark-text mb-4">
            Dados Pessoais
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {parlamentar.dataNascimento && (
              <div className="flex items-center gap-3">
                <div className="p-2 bg-brazil-green/10 rounded-lg">
                  <Calendar className="w-5 h-5 text-brazil-green" />
                </div>
                <div>
                  <p className="text-xs text-light-muted dark:text-dark-muted">
                    Data de Nascimento
                  </p>
                  <p className="text-sm text-light-text dark:text-dark-text">
                    {formatarData(parlamentar.dataNascimento)}
                  </p>
                </div>
              </div>
            )}

            {parlamentar.municipioNascimento && (
              <div className="flex items-center gap-3">
                <div className="p-2 bg-brazil-green/10 rounded-lg">
                  <MapPin className="w-5 h-5 text-brazil-green" />
                </div>
                <div>
                  <p className="text-xs text-light-muted dark:text-dark-muted">Naturalidade</p>
                  <p className="text-sm text-light-text dark:text-dark-text">
                    {parlamentar.municipioNascimento} - {parlamentar.ufNascimento}
                  </p>
                </div>
              </div>
            )}

            {parlamentar.escolaridade && (
              <div className="flex items-center gap-3">
                <div className="p-2 bg-brazil-green/10 rounded-lg">
                  <GraduationCap className="w-5 h-5 text-brazil-green" />
                </div>
                <div>
                  <p className="text-xs text-light-muted dark:text-dark-muted">Escolaridade</p>
                  <p className="text-sm text-light-text dark:text-dark-text">
                    {parlamentar.escolaridade}
                  </p>
                </div>
              </div>
            )}
          </div>
        </Card>
      </motion.div>

      {/* Mandate Info */}
      {(parlamentar.situacao || parlamentar.condicaoEleitoral) && (
        <motion.div variants={itemVariants} id="mandato">
          <Card padding="lg">
            <h2 className="text-xl font-display text-light-text dark:text-dark-text mb-4 flex items-center gap-2">
              <Building className="w-6 h-6" />
              Informações do Mandato
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {parlamentar.situacao && (
                <div>
                  <p className="text-xs text-light-muted dark:text-dark-muted mb-1">Situação</p>
                  <p className="text-sm text-light-text dark:text-dark-text font-semibold">
                    {parlamentar.situacao}
                  </p>
                </div>
              )}

              {parlamentar.condicaoEleitoral && (
                <div>
                  <p className="text-xs text-light-muted dark:text-dark-muted mb-1">
                    Condição Eleitoral
                  </p>
                  <p className="text-sm text-light-text dark:text-dark-text font-semibold">
                    {parlamentar.condicaoEleitoral}
                  </p>
                </div>
              )}
            </div>
          </Card>
        </motion.div>
      )}

      {/* External Links */}
      {parlamentar.url && (
        <motion.div variants={itemVariants} id="links">
          <Card padding="lg">
            <h2 className="text-xl font-display text-light-text dark:text-dark-text mb-4">
              Links Externos
            </h2>
            <a
              href={parlamentar.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brazil-green hover:text-brazil-green-dark transition-colors underline"
            >
              Ver perfil oficial no site do {parlamentar.tipo === 'deputado' ? 'Câmara dos Deputados' : 'Senado Federal'}
            </a>
          </Card>
        </motion.div>
      )}
    </motion.div>
  )
}
