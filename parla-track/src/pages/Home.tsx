import { MainLayout } from '../components/layout/MainLayout'

export function Home() {
  return (
    <MainLayout>
      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-display text-brazil-green mb-4">
            Home
          </h1>
          <p className="text-light-muted dark:text-dark-muted">
            Página Home (em construção)
          </p>
        </div>
      </div>
    </MainLayout>
  )
}
