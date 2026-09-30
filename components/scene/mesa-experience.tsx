"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft } from "@phosphor-icons/react/ssr";
import Link from "next/link";
import { BarScene } from "@/components/scene/bar-scene";
import { DrunkMeter, DrunkStage } from "@/components/scene/drunk-fx";
import { NoteModal } from "@/components/scene/note-modal";
import { useClientReady, useNotes } from "@/hooks/use-notes";
import {
  addNote,
  closeNote,
  moveNote,
  openNotes,
  removeNote,
  updateNote,
  type Note,
} from "@/lib/notes";
import { Logo } from "@/components/brand/logo";

export function MesaExperience() {
  const ready = useClientReady();
  const notes = useNotes();
  const open = openNotes(notes);
  const [draft, setDraft] = useState<Note | "new" | null>(null);
  const [text, setText] = useState("");
  const [toast, setToast] = useState<string | null>(null);
  const [fill, setFill] = useState(1);
  const [drinking, setDrinking] = useState(false);
  const [drunk, setDrunk] = useState(0);
  const sipLock = useRef(false);

  function flash(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(null), 2200);
  }

  function openPad() {
    setDraft("new");
    setText("");
  }

  function selectNote(note: Note) {
    setDraft(note);
    setText(note.text);
  }

  function closeModal() {
    setDraft(null);
    setText("");
  }

  function save() {
    const value = text.trim();
    if (!value) return;
    if (draft === "new") {
      addNote(value);
      flash("Anotado. Pode confiar.");
    } else if (draft) {
      updateNote(draft.id, value);
      flash("Anotado ✓");
    }
    closeModal();
  }

  function pay() {
    if (draft && draft !== "new") {
      closeNote(draft.id);
      flash("Conta fechada. Volte sempre!");
      closeModal();
    }
  }

  function trashFromModal() {
    if (draft && draft !== "new") {
      removeNote(draft.id);
      flash("Esse guardanapo foi pro lixo.");
      closeModal();
    }
  }

  const trashNote = (id: string) => {
    removeNote(id);
    flash("Esse guardanapo foi pro lixo.");
    setDraft((current) =>
      current && current !== "new" && current.id === id ? null : current,
    );
  };

  function drink() {
    if (sipLock.current || drinking) return;
    if (fill <= 0.08) {
      flash("Copo vazio. Chama o garçom?");
      return;
    }
    sipLock.current = true;
    setDrinking(true);
    window.setTimeout(() => {
      setFill((value) => Math.max(0, +(value - 0.28).toFixed(2)));
      setDrunk((value) => Math.min(5, value + 1));
      flash(fill <= 0.36 ? "Fundo. Última." : "Saúde.");
    }, 620);
    window.setTimeout(() => {
      setDrinking(false);
      sipLock.current = false;
    }, 1280);
  }

  useEffect(() => {
    if (drunk <= 0) return;
    const id = window.setTimeout(() => {
      setDrunk((value) => Math.max(0, value - 1));
    }, 12000);
    return () => window.clearTimeout(id);
  }, [drunk]);

  const countLabel =
    open.length === 0
      ? "Mesa vazia. Bora pedir uma ideia?"
      : `${open.length} ${open.length === 1 ? "item" : "itens"} na conta`;

  return (
    <div className="relative h-dvh overflow-hidden bg-[#c5dcf0]">
      <header className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-start justify-between p-4 sm:p-5">
        <div className="pointer-events-auto flex items-center gap-3">
          <Link
            href="/"
            className="inline-flex size-10 items-center justify-center border border-border bg-background/80 text-foreground backdrop-blur-sm"
            aria-label="Voltar"
          >
            <ArrowLeft size={16} weight="light" />
          </Link>
          <div className="border border-border bg-background/80 px-3 py-2 backdrop-blur-sm">
            <Logo />
            <p className="mt-1 text-mono-sm uppercase tracking-wider text-muted-foreground">
              Mesa 1
            </p>
          </div>
        </div>
        <p className="pointer-events-none max-w-[220px] text-right text-mono-sm uppercase tracking-wider text-muted-foreground">
          {ready ? countLabel : "Sua conta"}
        </p>
      </header>

      <DrunkMeter level={drunk} />

      <p className="pointer-events-none absolute bottom-6 left-1/2 z-10 -translate-x-1/2 px-4 text-center text-mono-sm uppercase tracking-[0.08em] text-muted-foreground">
        Copo pra beber · Guardanapo pra anotar · Lixo pra jogar fora
      </p>

      {ready ? (
        <DrunkStage level={drunk}>
          <BarScene
            notes={notes}
            onOpenPad={openPad}
            onSelectNote={selectNote}
            onMoveNote={moveNote}
            onTrashNote={trashNote}
            onDrink={drink}
            drinking={drinking}
            fill={fill}
          />
        </DrunkStage>
      ) : (
        <div className="flex h-full items-center justify-center text-mono-sm uppercase tracking-wider text-muted-foreground">
          Arrumando a mesa…
        </div>
      )}

      {draft ? (
        <NoteModal
          draft={draft}
          text={text}
          onText={setText}
          onClose={closeModal}
          onSave={save}
          onPay={pay}
          onTrash={trashFromModal}
        />
      ) : null}

      {toast ? (
        <div className="absolute top-24 left-1/2 z-40 -translate-x-1/2 border border-border bg-popover px-4 py-2 text-body-sm shadow-elevated">
          {toast}
        </div>
      ) : null}
    </div>
  );
}
