import NotesClient from "./Notes.client";

interface FilteredNotesPageProps {
  params: Promise<{
    slug: string[];
  }>;
}

export default async function FilteredNotesPage({
  params,
}: FilteredNotesPageProps) {
  const { slug } = await params;

  const rawTag = slug?.[0] ?? "all";

  const tag =
    rawTag === "all"
      ? "all"
      : rawTag.charAt(0).toUpperCase() + rawTag.slice(1).toLowerCase();

  return <NotesClient tag={tag} />;
}
