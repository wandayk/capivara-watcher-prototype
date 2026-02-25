import { MainLayout } from '../components/layout/MainLayout'
import { EmptyState } from '../components/parlamentar/EmptyState'
import { ParlamentarDetail } from '../components/parlamentar/ParlamentarDetail'
import { useParlamentares } from '../hooks/useParlamentares'

export function Home() {
  const { selectedParlamentar } = useParlamentares()

  return (
    <MainLayout>
      <div className="p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          {selectedParlamentar ? (
            <ParlamentarDetail parlamentar={selectedParlamentar} />
          ) : (
            <EmptyState />
          )}
        </div>
      </div>
    </MainLayout>
  )
}
