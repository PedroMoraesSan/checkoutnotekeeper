"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { loadNotes, subscribeNotes, type Note } from "@/lib/notes";

export function useNotes() {
  return useSyncExternalStore(subscribeNotes, loadNotes, loadNotes);
}

export function useOpenCount() {
  const notes = useNotes();
  return notes.filter((note) => !note.closed).length;
}

export function useClientReady() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setReady(true);
  }, []);
  return ready;
}
