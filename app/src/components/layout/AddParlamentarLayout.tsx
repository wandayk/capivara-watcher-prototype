import { ReactNode } from "react";

interface AddParlamentarLayoutProps {
  children: ReactNode;
}

export function AddParlamentarLayout({ children }: AddParlamentarLayoutProps) {
  return (
    <div className="h-screen overflow-hidden bg-background flex flex-col">
      {/* Header */}

      {/* Main Content */}
      <main className="flex-1 overflow-hidden">{children}</main>
    </div>
  );
}
