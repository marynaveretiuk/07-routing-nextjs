import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import NotesClient from "./Notes.client";
import { fetchNotes } from "@/lib/api";

interface FilteredNotesPageProps {
  params: {
    slug: string[];
  };
}

export default async function FilteredNotesPage({
  params,
}: FilteredNotesPageProps) {
  const rawTag = params.slug?.[0] ?? "all";

  const tag =
    rawTag === "all"
      ? "all"
      : rawTag.charAt(0).toUpperCase() + rawTag.slice(1).toLowerCase();

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", "", 1],
    queryFn: () => fetchNotes("", 1),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}
