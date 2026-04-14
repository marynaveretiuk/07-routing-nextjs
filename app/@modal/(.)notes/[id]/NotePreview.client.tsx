"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { fetchNoteById } from "@/lib/api";
import NotePreview from "@/components/NotePreview/NotePreview";
import NotePreviewModal from "@/components/NotePreview/NotePreviewModal";

export default function NotePreviewClient() {
  const params = useParams<{ id: string }>();
  const id = params.id;

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
    <NotePreviewModal>
      <NotePreview note={note} />
    </NotePreviewModal>
  );
}
