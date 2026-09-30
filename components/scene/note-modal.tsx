"use client";

import { useState } from "react";
import { Check, Trash } from "@phosphor-icons/react/ssr";
import { Button } from "@/components/ui/button";
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "@/components/ui/modal";
import { Textarea } from "@/components/ui/textarea";
import type { Note } from "@/lib/notes";

export function NoteModal({
  draft,
  text,
  onText,
  onClose,
  onSave,
  onPay,
  onTrash,
}: {
  draft: Note | "new";
  text: string;
  onText: (value: string) => void;
  onClose: () => void;
  onSave: () => void;
  onPay: () => void;
  onTrash: () => void;
}) {
  const [confirmTrash, setConfirmTrash] = useState(false);
  const isNew = draft === "new";

  return (
    <Modal
      open
      onClose={onClose}
      labelledBy="note-modal-title"
      size={confirmTrash ? "sm" : "md"}
    >
      {confirmTrash ? (
        <>
          <ModalHeader
            titleId="note-modal-title"
            eyebrow="Lixeira"
            title="Jogar fora o guardanapo?"
            onClose={() => setConfirmTrash(false)}
          />
          <ModalBody>
            <p className="text-body text-muted-foreground">
              Tem certeza? Esse guardanapo vai pro lixo. Não tem como pedir de
              volta pro garçom.
            </p>
          </ModalBody>
          <ModalFooter>
            <Button variant="secondary" onClick={() => setConfirmTrash(false)}>
              Deixa na mesa
            </Button>
            <Button variant="destructive" onClick={onTrash}>
              <Trash size={14} weight="light" />
              Jogar fora
            </Button>
          </ModalFooter>
        </>
      ) : (
        <>
          <ModalHeader
            titleId="note-modal-title"
            eyebrow={isNew ? "Novo pedido" : "Guardanapo"}
            title={isNew ? "Abrir comanda" : "Sua conta"}
            onClose={onClose}
          />
          <ModalBody>
            <Textarea
              autoFocus
              value={text}
              onChange={(event) => onText(event.target.value)}
              placeholder="Escreve aí, sem pressa..."
              className="min-h-36 font-hand text-lg leading-7"
            />
          </ModalBody>
          <ModalFooter className={isNew ? undefined : "justify-between"}>
            {!isNew ? (
              <Button
                variant="ghost"
                className="mr-auto text-destructive hover:bg-destructive/8"
                onClick={() => setConfirmTrash(true)}
              >
                <Trash size={14} weight="light" />
                Jogar fora
              </Button>
            ) : null}
            <Button variant="secondary" onClick={onClose}>
              {isNew ? "Deixa pra depois" : "Fechar"}
            </Button>
            {!isNew ? (
              <Button variant="secondary" onClick={onPay}>
                Fechar a conta
              </Button>
            ) : null}
            <Button onClick={onSave} disabled={!text.trim()}>
              <Check size={14} weight="light" />
              Anotado ✓
            </Button>
          </ModalFooter>
        </>
      )}
    </Modal>
  );
}
