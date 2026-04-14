import { fetchNoteById } from "@/lib/api";
import NotePreview from "@/components/NotePreview/NotePreview";
import NotePreviewModal from "@/components/NotePreview/NotePreviewModal";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  const note = await fetchNoteById(id);

  return (
    <NotePreviewModal>
      <NotePreview note={note} />
    </NotePreviewModal>
  );
}
