"use client";

import type { ReactNode } from "react";
import css from "./NotePreviewModal.module.css";

interface NotePreviewModalProps {
  children: ReactNode;
  onClose: () => void;
}

export default function NotePreviewModal({
  children,
  onClose,
}: NotePreviewModalProps) {
  return (
    <div className={css.backdrop} onClick={onClose}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <button type="button" className={css.closeBtn} onClick={onClose}>
          ×
        </button>
        {children}
      </div>
    </div>
  );
}
