import axios from "axios";
import type { Note, CreateNoteData } from "@/types/note";
import type { FetchNotesResponse } from "@/types/api";

const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const api = axios.create({
  baseURL: "https://notehub-public.goit.study/api/notes",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export async function fetchNotes(
  search: string,
  tag: string,
  page: number,
): Promise<FetchNotesResponse> {
  const params: Record<string, string | number> = {
    page,
  };

  if (search.trim()) {
    params.search = search.trim();
  }

  if (tag !== "all") {
    params.tag = tag;
  }

  const { data } = await api.get<FetchNotesResponse>("", {
    params,
  });

  return data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const { data } = await api.get<Note>(`/${id}`);
  return data;
}

export async function createNote(note: CreateNoteData): Promise<Note> {
  const { data } = await api.post<Note>("", note);
  return data;
}

export async function deleteNote(id: string): Promise<Note> {
  const { data } = await api.delete<Note>(`/${id}`);
  return data;
}
