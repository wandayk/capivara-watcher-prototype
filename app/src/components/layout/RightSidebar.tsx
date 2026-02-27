import { TableOfContents, TableOfContentsSection } from "./TableOfContents";

interface RightSidebarProps {
  sections: TableOfContentsSection[];
  activeSection: string;
  onSectionClick: (sectionId: string) => void;
}

export function RightSidebar({
  sections,
  activeSection,
  onSectionClick,
}: RightSidebarProps) {
  return (
    <aside className="hidden lg:block w-70 bg-background">
      <div className="sticky top-0 h-screen overflow-y-auto py-6 px-4">
        <TableOfContents
          sections={sections}
          activeSection={activeSection}
          onSectionClick={onSectionClick}
        />
      </div>
    </aside>
  );
}
