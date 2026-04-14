import type { ReactNode } from "react";
import css from "../LayoutNotes.module.css";

interface FilterLayoutProps {
  children: ReactNode;
  sidebar: ReactNode;
  modal: ReactNode;
}

export default function FilterLayout({
  children,
  sidebar,
  modal,
}: FilterLayoutProps) {
  return (
    <div className={css.container}>
      <aside className={css.sidebar}>{sidebar}</aside>
      <div className={css.content}>{children}</div>
      {modal}
    </div>
  );
}
