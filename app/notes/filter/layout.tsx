import type { ReactNode } from "react";

interface FilterLayoutProps {
  children: ReactNode;
}

export default function FilterLayout({ children }: FilterLayoutProps) {
  return <>{children}</>;
}
