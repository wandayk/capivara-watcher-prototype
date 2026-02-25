import { useState, useEffect } from 'react'
import { Search, Filter, X } from 'lucide-react'
import { MainLayout } from '../components/layout/MainLayout'
import { BrazilMap } from '../components/map/BrazilMap'
import { ParlamentarCard } from '../components/parlamentar/ParlamentarCard'
import { LoadingSpinner } from '../components/common/LoadingSpinner'
import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { useParlamentares } from '../hooks/useParlamentares'
import { useDebounce } from '../hooks/useDebounce'
import { fetchDeputados } from '../services/camaraApi'
import { fetchSenadores } from '../services/senadoApi'
import { Parlamentar } from '../types'
import { PARTIDOS } from '../utils/constants'
import { buscarTexto } from '../utils/helpers'

export function AddParlamentar() {
  const { isParlamentarAdded, addParlamentar, selectParlamentar } = useParlamentares()

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedUF, setSelectedUF] = useState<string | null>(null)
  const [selectedTipo, setSelectedTipo] = useState<'todos' | 'deputado' | 'senador'>('todos')
  const [selectedPartido, setSelectedPartido] = useState<string>('')
  const [parlamentares, setParlamentares] = useState<Parlamentar[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const debouncedSearch = useDebounce(searchTerm, 500)

  // Fetch parlamentares
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError('')

      try {
        let results: Parlamentar[] = []

        // Fetch deputados
        if (selectedTipo === 'todos' || selectedTipo === 'deputado') {
          try {
            const deputados = await fetchDeputados({
              nome: debouncedSearch || undefined,
              siglaUf: selectedUF || undefined,
              siglaPartido: selectedPartido || undefined,
              itens: 50,
            })
            results = [...results, ...deputados]
          } catch (err) {
            console.error('Erro ao buscar deputados:', err)
          }
        }

        // Fetch senadores
        if (selectedTipo === 'todos' || selectedTipo === 'senador') {
          try {
            let senadores = await fetchSenadores()

            // Filter client-side
            if (selectedUF) {
              senadores = senadores.filter(s => s.uf === selectedUF)
            }
            if (selectedPartido) {
              senadores = senadores.filter(s => s.partido === selectedPartido)
            }
            if (debouncedSearch) {
              senadores = senadores.filter(s =>
                buscarTexto(s.nome, debouncedSearch)
              )
            }

            results = [...results, ...senadores]
          } catch (err) {
            console.error('Erro ao buscar senadores:', err)
          }
        }

        setParlamentares(results)
      } catch (err) {
        setError('Erro ao buscar parlamentares. Tente novamente.')
        setParlamentares([])
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [debouncedSearch, selectedUF, selectedTipo, selectedPartido])

  const handleAddParlamentar = (parlamentar: Parlamentar) => {
    const added = addParlamentar(parlamentar)
    if (added) {
      selectParlamentar(parlamentar)
    }
  }

  const clearFilters = () => {
    setSearchTerm('')
    setSelectedUF(null)
    setSelectedTipo('todos')
    setSelectedPartido('')
  }

  return (
    <MainLayout>
      <div className="h-full flex flex-col lg:flex-row overflow-hidden">
        {/* Left Side - Map */}
        <div className="lg:w-2/5 p-4 lg:p-6 overflow-y-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-display text-brazil-green mb-2">
              Buscar Parlamentares
            </h1>
            <p className="text-sm text-light-muted dark:text-dark-muted">
              Clique em um estado no mapa ou use os filtros
            </p>
          </div>

          <BrazilMap selectedUF={selectedUF || undefined} onSelectUF={setSelectedUF} />

          {selectedUF && (
            <div className="mt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedUF(null)}
                fullWidth
              >
                <X className="w-4 h-4" />
                Limpar seleção de estado
              </Button>
            </div>
          )}
        </div>

        {/* Right Side - Search & Results */}
        <div className="lg:w-3/5 flex flex-col border-t lg:border-t-0 lg:border-l border-light-border dark:border-dark-border">
          {/* Filters */}
          <div className="p-4 lg:p-6 border-b border-light-border dark:border-dark-border space-y-4">
            {/* Search */}
            <Input
              placeholder="Buscar por nome..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              leftIcon={<Search className="w-5 h-5" />}
            />

            {/* Tipo Filter */}
            <div className="flex gap-2">
              <Button
                variant={selectedTipo === 'todos' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setSelectedTipo('todos')}
              >
                Todos
              </Button>
              <Button
                variant={selectedTipo === 'deputado' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setSelectedTipo('deputado')}
              >
                Deputados
              </Button>
              <Button
                variant={selectedTipo === 'senador' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setSelectedTipo('senador')}
              >
                Senadores
              </Button>
            </div>

            {/* Partido Filter */}
            <div>
              <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-2">
                <Filter className="w-4 h-4 inline mr-1" />
                Partido
              </label>
              <select
                value={selectedPartido}
                onChange={(e) => setSelectedPartido(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border text-light-text dark:text-dark-text"
              >
                <option value="">Todos os partidos</option>
                {PARTIDOS.map(partido => (
                  <option key={partido} value={partido}>{partido}</option>
                ))}
              </select>
            </div>

            {/* Clear Filters */}
            {(searchTerm || selectedUF || selectedTipo !== 'todos' || selectedPartido) && (
              <Button variant="ghost" size="sm" onClick={clearFilters} fullWidth>
                <X className="w-4 h-4" />
                Limpar filtros
              </Button>
            )}

            {/* Active Filters */}
            <div className="flex flex-wrap gap-2">
              {selectedUF && (
                <span className="px-3 py-1 bg-brazil-green/10 text-brazil-green text-xs rounded-full">
                  UF: {selectedUF}
                </span>
              )}
              {selectedTipo !== 'todos' && (
                <span className="px-3 py-1 bg-brazil-green/10 text-brazil-green text-xs rounded-full capitalize">
                  {selectedTipo}
                </span>
              )}
              {selectedPartido && (
                <span className="px-3 py-1 bg-brazil-green/10 text-brazil-green text-xs rounded-full">
                  {selectedPartido}
                </span>
              )}
            </div>
          </div>

          {/* Results */}
          <div className="flex-1 overflow-y-auto p-4 lg:p-6">
            {loading ? (
              <div className="flex items-center justify-center py-16">
                <LoadingSpinner text="Buscando parlamentares..." />
              </div>
            ) : error ? (
              <div className="text-center py-16">
                <p className="text-red-500">{error}</p>
              </div>
            ) : parlamentares.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-light-muted dark:text-dark-muted">
                  Nenhum parlamentar encontrado
                </p>
                <p className="text-sm text-light-muted dark:text-dark-muted mt-2">
                  Tente ajustar os filtros
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-sm text-light-muted dark:text-dark-muted mb-4">
                  {parlamentares.length} parlamentares encontrados
                </p>
                {parlamentares.map((parlamentar) => (
                  <ParlamentarCard
                    key={parlamentar.id}
                    parlamentar={parlamentar}
                    isAdded={isParlamentarAdded(parlamentar.id)}
                    onAdd={() => handleAddParlamentar(parlamentar)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
