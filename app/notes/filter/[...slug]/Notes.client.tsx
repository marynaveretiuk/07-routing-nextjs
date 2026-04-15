"use client";

import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

import css from "../../NotesPage.module.css";
import { fetchNotes } from "@/lib/api";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import NoteList from "@/components/NoteList/NoteList";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";

interface NotesClientProps {
  tag: string;
}

export default function NotesClient({ tag }: NotesClientProps) {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const debouncedSearch = useDebouncedCallback((value: string) => {
    setSearchQuery(value);
    setPage(1);
  }, 500);

  const handleSearchChange = (value: string) => {
    setInputValue(value);
    debouncedSearch(value);
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", searchQuery, tag, page],
    queryFn: () => fetchNotes(searchQuery, tag, page),
    placeholderData: keepPreviousData,
  });

  const notes = data?.notes ?? [];

  if (isLoading) {
    return <p>Loading, please wait...</p>;
  }

  if (isError) {
    return <p>Something went wrong.</p>;
  }

  return (
    <main className={css.container}>
      <div className={css.toolbar}>
        <SearchBox value={inputValue} onChange={handleSearchChange} />

        <button
          className={css.button}
          type="button"
          onClick={() => setIsModalOpen(true)}
        >
          Create note +
        </button>
      </div>

      {notes.length > 0 ? <NoteList notes={notes} /> : <p>No notes found.</p>}

      {data && data.totalPages > 1 && (
        <Pagination
          page={page}
          totalPages={data.totalPages}
          onPageChange={setPage}
        />
      )}

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onClose={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </main>
  );
}
