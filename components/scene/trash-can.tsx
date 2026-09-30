"use client";

import { useState } from "react";
import { Html, useCursor } from "@react-three/drei";

export const TRASH_POSITION: [number, number, number] = [2.05, -0.28, 1.42];
export const TRASH_RADIUS = 0.72;

export function isOverTrash(x: number, z: number) {
  const dx = x - TRASH_POSITION[0];
  const dz = z - TRASH_POSITION[2];
  return dx * dx + dz * dz < TRASH_RADIUS * TRASH_RADIUS;
}

export function TrashCan({ hot }: { hot?: boolean }) {
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);
  const active = hot || hovered;

  return (
    <group
      position={TRASH_POSITION}
      onPointerOver={(event) => {
        event.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={() => setHovered(false)}
    >
      <mesh position={[0, 0.02, 0]} castShadow>
        <cylinderGeometry args={[0.28, 0.24, 0.62, 16]} />
        <meshStandardMaterial
          color={active ? "#3a3a3c" : "#2a2a2c"}
          roughness={0.55}
          metalness={0.25}
          emissive={active ? "#51a2ff" : "#000000"}
          emissiveIntensity={active ? 0.18 : 0}
        />
      </mesh>
      <mesh position={[0, 0.34, 0]} castShadow>
        <cylinderGeometry args={[0.3, 0.29, 0.08, 16]} />
        <meshStandardMaterial color="#1a1a1c" roughness={0.5} metalness={0.3} />
      </mesh>
      <mesh position={[0, 0.22, 0]}>
        <cylinderGeometry args={[0.22, 0.2, 0.08, 12]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
      </mesh>
      <mesh position={[0.16, 0.42, 0]} rotation={[0, 0, active ? -0.9 : -0.25]} castShadow>
        <boxGeometry args={[0.34, 0.04, 0.34]} />
        <meshStandardMaterial color="#3a3a3c" roughness={0.5} metalness={0.2} />
      </mesh>
      {active ? (
        <mesh position={[0, 0.82, 0]}>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshBasicMaterial color="#51a2ff" />
        </mesh>
      ) : null}
      <Html
        position={[0, 0.95, 0]}
        center
        sprite
        zIndexRange={[20, 0]}
        style={{ pointerEvents: "none" }}
      >
        <span className="rounded-[2px] border border-border bg-background/90 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground backdrop-blur-sm">
          Lixo
        </span>
      </Html>
    </group>
  );
}
