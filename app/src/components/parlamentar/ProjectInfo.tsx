import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Info,
  Target,
  Database,
  AlertCircle,
  BookOpen,
  CheckCircle,
  Building,
  Landmark,
  ExternalLink,
  Users,
  Scale,
  Vote,
  Plus,
} from "lucide-react";
import { Card } from "@/components/ui/CardWithPadding";
import { Button } from "@/components/ui/ButtonCompat";
import { ROUTES } from "../../utils/constants";

export function ProjectInfo() {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const objectives = [
    {
      title: "Acompanhamento em Tempo Real",
      description:
        "Monitore atividades parlamentares com dados atualizados diretamente das APIs oficiais.",
    },
    {
      title: "Acesso Simplificado",
      description:
        "Interface intuitiva que torna fácil encontrar e acompanhar seus parlamentares de interesse.",
    },
    {
      title: "Participação Cidadã",
      description:
        "Empodere-se com informações para participar ativamente da democracia.",
    },
    {
      title: "Transparência Governamental",
      description:
        "Contribua para um governo mais transparente e responsável perante a sociedade.",
    },
  ];

  const dataSources = [
    {
      name: "Câmara dos Deputados",
      description:
        "Dados abertos sobre deputados federais, proposições, votações e despesas.",
      url: "https://dadosabertos.camara.leg.br/",
      icon: Building,
    },
    {
      name: "Senado Federal",
      description:
        "Informações sobre senadores, atividades legislativas e tramitações.",
      url: "https://legis.senado.leg.br/dadosabertos/",
      icon: Landmark,
    },
  ];

  const importancePoints = [
    {
      icon: Users,
      title: "Participação Democrática",
      description:
        "Cidadãos informados podem participar ativamente das decisões que afetam suas vidas.",
    },
    {
      icon: Scale,
      title: "Responsabilização",
      description:
        "O acompanhamento constante garante que representantes sejam responsáveis por suas ações.",
    },
    {
      icon: Vote,
      title: "Voto Consciente",
      description:
        "Informações sobre o histórico parlamentar auxiliam em escolhas eleitorais mais fundamentadas.",
    },
  ];

  const steps = [
    {
      title: "Clique em 'Adicionar Parlamentar'",
      description:
        "Use o botão verde na barra lateral esquerda para abrir a página de busca.",
      tip: "O botão está sempre visível para facilitar o acesso.",
    },
    {
      title: "Busque Parlamentares",
      description:
        "Procure por nome, estado (UF) ou partido. Você pode filtrar por deputados ou senadores.",
      tip: "Use o mapa interativo para encontrar parlamentares por estado.",
    },
    {
      title: "Adicione à Sua Lista",
      description:
        "Clique no botão 'Adicionar' no card do parlamentar desejado.",
      tip: "Você pode adicionar quantos parlamentares quiser!",
    },
    {
      title: "Acompanhe Atividades",
      description:
        "Selecione um parlamentar da sua lista para ver informações detalhadas sobre ele.",
      tip: "Os dados são atualizados em tempo real das fontes oficiais.",
    },
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-24"
    >
      {/* Section 1: Sobre o Projeto */}
      <motion.section variants={itemVariants} id="sobre">
        <div>
          <div className="flex items-center gap-4 mb-6">
            <h2 className="text-3xl font-display text-foreground">
              Sobre o Projeto
            </h2>
          </div>
          <div className="space-y-4">
            <p className="text-lg text-muted-foreground leading-relaxed">
              O <strong className="text-foreground">Capivara Watcher</strong> é
              uma plataforma dedicada ao monitoramento e acompanhamento das
              atividades parlamentares no Congresso Nacional Brasileiro.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Nossa missão é democratizar o acesso à informação pública,
              permitindo que qualquer cidadão possa acompanhar facilmente o
              trabalho de seus representantes eleitos no Senado Federal e na
              Câmara dos Deputados.
            </p>
            <div className="mt-6 p-4 bg-brazil-yellow/10 border-l-4 border-brazil-yellow rounded-r-lg">
              <p className="text-sm text-foreground font-semibold">
                💡 Transparência e cidadania ativa são os pilares da democracia
                moderna.
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Section 2: Objetivos */}
      <motion.section variants={itemVariants} id="objetivos">
        <div>
          <div className="flex items-center gap-4 mb-6">
            <h2 className="text-3xl font-display text-foreground">Objetivos</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {objectives.map((objective, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-3 bg-muted rounded-lg"
              >
                <Card>
                  <div className="flex-shrink-0 mt-1">
                    <CheckCircle className="w-5 h-5 text-brazil-green" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      {objective.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {objective.description}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Section 3: Fontes de Dados */}
      <motion.section variants={itemVariants} id="fontes">
        <div>
          <div className="flex items-center gap-4 mb-6">
            <h2 className="text-3xl font-display text-foreground">
              Fontes de Dados
            </h2>
          </div>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Utilizamos exclusivamente dados oficiais e públicos fornecidos
              pelas APIs abertas do governo brasileiro:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              {dataSources.map((source, index) => (
                <Card
                  key={index}
                 
                  hover
                  className="border-2 border-transparent hover:border-brazil-green"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-brazil-green/10 rounded">
                      <source.icon className="w-6 h-6 text-brazil-green" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground mb-2">
                        {source.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        {source.description}
                      </p>
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-brazil-green hover:underline flex items-center gap-1"
                      >
                        Acessar API
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Section 4: Importância do Acompanhamento */}
      <motion.section variants={itemVariants} id="importancia">
        <div>
          <div className="flex items-center gap-4 mb-6">
            <h2 className="text-3xl font-display text-foreground">
              Importância do Acompanhamento
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {importancePoints.map((point, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
                className="text-center"
              >
                <Card>
                  <div className="inline-flex p-4 bg-gradient-to-br from-brazil-green/20 to-brazil-blue/20 rounded-full mb-4">
                    <point.icon className="w-8 h-8 text-brazil-green" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                    {point.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {point.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Section 5: Como Usar */}
      <motion.section variants={itemVariants} id="como-usar">
        <div>
          <div className="flex items-center gap-4 mb-6">
            <h2 className="text-3xl font-display text-foreground">Como Usar</h2>
          </div>
          <div className="space-y-6">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex gap-4"
              >
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground mb-3">
                    {step.description}
                  </p>
                  {step.tip && (
                    <div className="p-3 bg-brazil-green/5 border-l-2 border-brazil-green rounded-r">
                      <p className="text-sm text-foreground">
                        <strong>Dica:</strong> {step.tip}
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
}
