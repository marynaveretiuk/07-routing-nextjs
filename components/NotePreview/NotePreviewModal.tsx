"use client";

import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import Modal from "@/components/Modal/Modal";

interface NotePreviewModalProps {
  children: ReactNode;
}

export default function NotePreviewModal({ children }: NotePreviewModalProps) {
  const router = useRouter();

  return <Modal onClose={() => router.back()}>{children}</Modal>;
}
