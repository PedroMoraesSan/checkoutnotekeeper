"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useCursor, Html } from "@react-three/drei";
import { DoubleSide } from "three";
import { makeNapkinTexture } from "@/lib/napkin-texture";
import { isOverTrash } from "@/components/scene/trash-can";
import type { Note } from "@/lib/notes";

export function NapkinPad({ onOpen }: { onOpen: () => void }) {
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);

  return (
    <group
      position={[1.05, 0.03, 0.48]}
      rotation={[-0.02, -0.35, 0.04]}
      onPointerDown={(event) => {
        event.stopPropagation();
        onOpen();
      }}
      onPointerOver={(event) => {
        event.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={() => setHovered(false)}
    >
      <mesh
        position={[0, 0.05, 0]}
        onPointerDown={(event) => {
          event.stopPropagation();
          onOpen();
        }}
      >
        <boxGeometry args={[0.9, 0.1, 0.9]} />
        <meshBasicMaterial transparent opacity={0.001} depthWrite={false} />
      </mesh>
      <mesh position={[0.02, 0, -0.02]} receiveShadow>
        <boxGeometry args={[0.72, 0.012, 0.72]} />
        <meshStandardMaterial color="#e6dcc8" roughness={0.95} />
      </mesh>
      <mesh position={[0, hovered ? 0.03 : 0.016, 0]} castShadow>
        <boxGeometry args={[0.7, 0.014, 0.7]} />
        <meshStandardMaterial
          color={hovered ? "#fff6e8" : "#f2ead9"}
          roughness={0.9}
          emissive={hovered ? "#51a2ff" : "#000000"}
          emissiveIntensity={hovered ? 0.12 : 0}
        />
      </mesh>
      <Html
        position={[0, 0.28, 0]}
        center
        sprite
        zIndexRange={[20, 0]}
        style={{ pointerEvents: "none" }}
      >
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onOpen();
          }}
          onPointerDown={(event) => {
            event.stopPropagation();
            onOpen();
          }}
          className="pointer-events-auto rounded-[2px] border border-border bg-background/90 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.08em] text-foreground shadow-elevated backdrop-blur-sm"
        >
          Anotar
        </button>
      </Html>
    </group>
  );
}

export function NotesLayer({
  notes,
  onSelect,
  onMove,
  onTrash,
  onDragging,
}: {
  notes: Note[];
  onSelect: (note: Note) => void;
  onMove: (id: string, x: number, z: number) => void;
  onTrash: (id: string) => void;
  onDragging: (active: boolean, overTrash: boolean) => void;
}) {
  const [drag, setDrag] = useState<{
    id: string;
    x: number;
    z: number;
    originX: number;
    originZ: number;
  } | null>(null);
  const dragRef = useRef(drag);
  dragRef.current = drag;

  function updateDrag(
    next: {
      id: string;
      x: number;
      z: number;
      originX: number;
      originZ: number;
    } | null,
  ) {
    setDrag(next);
    onDragging(!!next, next ? isOverTrash(next.x, next.z) : false);
  }

  function finish() {
    const current = dragRef.current;
    if (!current) return;
    const moved =
      Math.hypot(current.x - current.originX, current.z - current.originZ) >
      0.12;
    const note = notes.find((item) => item.id === current.id);
    if (isOverTrash(current.x, current.z)) {
      onTrash(current.id);
    } else if (moved) {
      onMove(current.id, current.x, current.z);
    } else if (note) {
      onSelect(note);
    }
    updateDrag(null);
  }

  function startDrag(next: {
    id: string;
    x: number;
    z: number;
    originX: number;
    originZ: number;
  }) {
    dragRef.current = next;
    updateDrag(next);
    function onUp() {
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      finish();
    }
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
  }

  return (
    <group>
      {drag ? (
        <mesh
          position={[0, 0.07, 0.5]}
          rotation={[-Math.PI / 2, 0, 0]}
          onPointerMove={(event) => {
            event.stopPropagation();
            const x = event.point.x;
            const z = event.point.z;
            setDrag((current) => {
              if (!current) return current;
              const next = { ...current, x, z };
              dragRef.current = next;
              return next;
            });
            onDragging(true, isOverTrash(x, z));
          }}
          onPointerUp={(event) => {
            event.stopPropagation();
            finish();
          }}
        >
          <planeGeometry args={[14, 12]} />
          <meshBasicMaterial transparent opacity={0.001} depthWrite={false} />
        </mesh>
      ) : null}
      {notes.map((note) => {
        const x = drag?.id === note.id ? drag.x : note.x;
        const z = drag?.id === note.id ? drag.z : note.z;
        return (
          <NoteNapkin
            key={note.id}
            note={note}
            x={x}
            z={z}
            lifted={drag?.id === note.id}
            onPointerDown={() =>
              startDrag({
                id: note.id,
                x: note.x,
                z: note.z,
                originX: note.x,
                originZ: note.z,
              })
            }
          />
        );
      })}
    </group>
  );
}

function NoteNapkin({
  note,
  x,
  z,
  lifted,
  onPointerDown,
}: {
  note: Note;
  x: number;
  z: number;
  lifted: boolean;
  onPointerDown: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  useCursor(hovered || lifted);
  const texture = useMemo(
    () => makeNapkinTexture(note.text, note.closed),
    [note.text, note.closed],
  );

  useEffect(() => {
    return () => texture.dispose();
  }, [texture]);

  return (
    <mesh
      position={[x, lifted ? 0.14 : 0.03, z]}
      rotation={[-Math.PI / 2, 0, note.rotation]}
      castShadow
      receiveShadow
      onPointerDown={(event) => {
        event.stopPropagation();
        onPointerDown();
      }}
      onPointerOver={(event) => {
        event.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={() => setHovered(false)}
    >
      <planeGeometry args={[0.62, 0.62]} />
      <meshStandardMaterial
        map={texture}
        roughness={0.92}
        side={DoubleSide}
        emissive={hovered || lifted ? "#51a2ff" : "#000000"}
        emissiveIntensity={hovered || lifted ? 0.1 : 0}
      />
    </mesh>
  );
}
