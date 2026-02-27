import { MainLayout } from "../components/layout/MainLayout";
import { ProjectInfo } from "../components/parlamentar/ProjectInfo";
import { ParlamentarDetail } from "../components/parlamentar/ParlamentarDetail";
import { useParlamentares } from "../hooks/useParlamentares";

export function Home() {
  const { selectedParlamentar } = useParlamentares();

  return (
    <MainLayout>
      <div className="py-14 px-30">
        <div className="max-w-6xl mx-auto">
          {selectedParlamentar ? (
            <ParlamentarDetail parlamentar={selectedParlamentar} />
          ) : (
            <ProjectInfo />
          )}
        </div>
      </div>
    </MainLayout>
  );
}
