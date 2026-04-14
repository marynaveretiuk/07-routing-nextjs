"use client";

import { useMemo } from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { fetchNotes } from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";

export default function FilteredNotesPage() {
  const params = useParams<{ slug: string[] }>();
  const rawTag = params.slug?.[0] ?? "all";

  const tag =
    rawTag === "all"
      ? "all"
      : rawTag.charAt(0).toUpperCase() + rawTag.slice(1).toLowerCase();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["filter-notes", tag],
    queryFn: () => fetchNotes("", 1),
  });

  const filteredNotes = useMemo(() => {
    if (!data) return [];

    if (tag === "all") {
      return data.notes;
    }

    return data.notes.filter(
      (note) => note.tag.toLowerCase() === tag.toLowerCase(),
    );
  }, [data, tag]);

  if (isLoading) {
    return <p>Loading, please wait...</p>;
  }

  if (isError) {
    return <p>Something went wrong.</p>;
  }

  return (
    <main>
      <p>Current tag: {tag}</p>

      {filteredNotes.length > 0 ? (
        <NoteList notes={filteredNotes} />
      ) : (
        <p>No notes found.</p>
      )}
    </main>
  );
}
