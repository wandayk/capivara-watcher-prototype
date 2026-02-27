import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TableOfContentsSection {
  id: string;
  title: string;
  icon?: LucideIcon;
}

interface TableOfContentsProps {
  sections: TableOfContentsSection[];
  activeSection: string;
  onSectionClick: (sectionId: string) => void;
}

export function TableOfContents({
  sections,
  activeSection,
  onSectionClick,
}: TableOfContentsProps) {
  const handleClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    const mainElement = document.querySelector('main');

    if (element && mainElement) {
      const headerOffset = 80;
      const mainRect = mainElement.getBoundingClientRect();
      const elementRect = element.getBoundingClientRect();
      const offsetPosition = elementRect.top - mainRect.top + mainElement.scrollTop - headerOffset;

      mainElement.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
    onSectionClick(sectionId);
  };

  const activeIndex = sections.findIndex((s) => s.id === activeSection);

  return (
    <div className="space-y-1">
      <h3 className="text-sm font-semibold text-foreground mb-4 px-3">
        Nesta página
      </h3>
      <div className="relative pl-4 border-l border-border">
        {/* Linha vertical de fundo (1px) */}
        <div className="absolute left-0 top-0 bottom-0 w-px bg-border" />

        {/* Indicador de progresso ativo (linha verde sobre a cinza) */}
        <motion.div
          className="absolute left-0 w-px bg-green-600/70 z-10"
          initial={false}
          animate={{
            top:
              activeIndex >= 0
                ? `${(activeIndex / sections.length) * 100}%`
                : "0%",
            height: activeIndex >= 0 ? `${(1 / sections.length) * 100}%` : "0%",
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        />

        {sections.map((section, index) => {
          const Icon = section.icon;
          const isActive = activeSection === section.id;

          return (
            <motion.button
              key={section.id}
              onClick={() => handleClick(section.id)}
              className={cn(
                "relative w-full text-left py-2 px-3 rounded-lg transition-all mb-1",
                "flex items-center gap-2 text-sm",
                "before:absolute before:left-0 before:top-0 before:bottom-0 before:opacity-0 before:transition-opacity",
                isActive
                  ? "bg-brazil-green/10 text-brazil-green font-semibold border-brazil-green/30 before:opacity-100"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground border-border",
              )}
              whileHover={{ x: isActive ? 0 : 4 }}
              transition={{ duration: 0.2 }}
            >
              {Icon && <Icon className="w-4 h-4 flex-shrink-0" />}
              <span className="truncate">{section.title}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
