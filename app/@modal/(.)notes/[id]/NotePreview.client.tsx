"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { fetchNoteById } from "@/lib/api";
import NotePreview from "@/components/NotePreview/NotePreview";
import NotePreviewModal from "@/components/NotePreview/NotePreviewModal";

export default function NotePreviewClient() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const id = params.id;

  const handleClose = () => {
    router.back();
  };

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) {
    return <p>Loading, please wait...</p>;
  }

  if (error || !note) {
    return <p>Something went wrong.</p>;
  }

  return (
    <NotePreviewModal onClose={handleClose}>
      <NotePreview note={note} />
    </NotePreviewModal>
  );
}
