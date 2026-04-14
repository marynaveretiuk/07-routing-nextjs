import type { ReactNode } from "react";
import css from "./LayoutNotes.module.css";

interface NotesLayoutProps {
  children: ReactNode;
  sidebar: ReactNode;
  modal: ReactNode;
}

export default function NotesLayout({
  children,
  sidebar,
  modal,
}: NotesLayoutProps) {
  return (
    <div className={css.container}>
      <aside className={css.sidebar}>{sidebar}</aside>
      <div className={css.content}>{children}</div>
      {modal}
    </div>
  );
}
