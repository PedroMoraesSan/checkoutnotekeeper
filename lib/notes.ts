export type Note = {
  id: string;
  text: string;
  createdAt: number;
  closed: boolean;
  x: number;
  z: number;
  rotation: number;
};

const KEY = "guardanapo.comandas";
const EMPTY: Note[] = [];

const listeners = new Set<() => void>();
let snapshot: Note[] = EMPTY;
let hydrated = false;

function persist(notes: Note[]) {
  snapshot = notes;
  if (typeof window !== "undefined") {
    localStorage.setItem(KEY, JSON.stringify(notes));
  }
  listeners.forEach((fn) => fn());
}

function hydrate() {
  if (hydrated || typeof window === "undefined") return;
  hydrated = true;
  try {
    const raw = localStorage.getItem(KEY);
    snapshot = raw ? (JSON.parse(raw) as Note[]) : EMPTY;
  } catch {
    snapshot = EMPTY;
  }
}

export function loadNotes() {
  hydrate();
  return snapshot;
}

export function subscribeNotes(onStoreChange: () => void) {
  hydrate();
  listeners.add(onStoreChange);
  return () => {
    listeners.delete(onStoreChange);
  };
}

export function addNote(text: string): Note {
  const note: Note = {
    id: crypto.randomUUID(),
    text: text.trim(),
    createdAt: Date.now(),
    closed: false,
    x: -0.85 + Math.random() * 1.4,
    z: -0.55 + Math.random() * 0.85,
    rotation: (Math.random() - 0.5) * 0.7,
  };
  persist([note, ...loadNotes()]);
  return note;
}

export function updateNote(id: string, text: string) {
  persist(
    loadNotes().map((note) =>
      note.id === id ? { ...note, text: text.trim() } : note,
    ),
  );
}

export function closeNote(id: string) {
  persist(
    loadNotes().map((note) =>
      note.id === id ? { ...note, closed: true } : note,
    ),
  );
}

export function removeNote(id: string) {
  persist(loadNotes().filter((note) => note.id !== id));
}

export function moveNote(id: string, x: number, z: number) {
  persist(
    loadNotes().map((note) => (note.id === id ? { ...note, x, z } : note)),
  );
}

export function openNotes(notes: Note[]) {
  return notes.filter((note) => !note.closed);
}
