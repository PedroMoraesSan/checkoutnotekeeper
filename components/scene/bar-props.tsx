"use client";

import { useRef, useState } from "react";
import { useCursor, Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { DoubleSide, type Group } from "three";

export function BarProps({
  onDrink,
  drinking,
  fill,
}: {
  onDrink: () => void;
  drinking: boolean;
  fill: number;
}) {
  return (
    <group>
      <Pint
        position={[-1.35, 0, 0.35]}
        onDrink={onDrink}
        drinking={drinking}
        fill={fill}
      />
      <Coaster position={[-1.35, 0.01, 0.35]} />
      <Bottle position={[1.45, 0, -0.55]} />
      <Bowl position={[-0.35, 0, -0.72]} />
      <Lemon position={[0.55, 0.07, 0.78]} />
      <WetRing position={[0.15, 0.005, -0.15]} />
      <Chair position={[-0.15, 0, 1.42]} rotation={Math.PI} />
      <Chair position={[1.55, 0, 0.15]} rotation={-Math.PI / 2} />
      <SideTable position={[-6.6, 0, 0.2]} />
      <Chair position={[-6.55, 0, 1.25]} rotation={Math.PI} />
      <MenuCard position={[0.15, 0.04, -0.85]} />
    </group>
  );
}

function Pint({
  position,
  onDrink,
  drinking,
  fill,
}: {
  position: [number, number, number];
  onDrink: () => void;
  drinking: boolean;
  fill: number;
}) {
  const ref = useRef<Group>(null);
  const phase = useRef(0);
  const [hovered, setHovered] = useState(false);
  useCursor(hovered && !drinking);

  useFrame((_, delta) => {
    const group = ref.current;
    if (!group) return;
    if (drinking) {
      phase.current = Math.min(1, phase.current + delta / 1.25);
    } else {
      phase.current = 0;
    }
    const p = phase.current;
    const lift = Math.sin(p * Math.PI);
    group.position.y = lift * 0.95;
    group.position.z = lift * -0.1;
    group.rotation.x = lift * -0.55;
    group.rotation.z = lift * 0.72;
  });

  const liquid = Math.max(fill, 0.02);

  return (
    <group position={position}>
      <group ref={ref}>
        <mesh
          position={[0, 0.52, 0]}
          onPointerDown={(event) => {
            event.stopPropagation();
            onDrink();
          }}
          onPointerOver={(event) => {
            event.stopPropagation();
            setHovered(true);
          }}
          onPointerOut={() => setHovered(false)}
        >
          <cylinderGeometry args={[0.28, 0.24, 1.15, 16]} />
          <meshBasicMaterial transparent opacity={0.001} depthWrite={false} />
        </mesh>
        <mesh
          position={[0, 0.52, 0]}
          castShadow
          onPointerDown={(event) => {
            event.stopPropagation();
            onDrink();
          }}
        >
          <cylinderGeometry args={[0.2, 0.17, 1.05, 28]} />
          <meshPhysicalMaterial
            color={hovered ? "#e8f4ff" : "#d7e6ee"}
            transparent
            opacity={0.28}
            roughness={0.08}
            metalness={0.05}
            transmission={0.55}
            thickness={0.35}
            emissive={hovered ? "#51a2ff" : "#000000"}
            emissiveIntensity={hovered ? 0.2 : 0}
          />
        </mesh>
        {fill > 0.04 ? (
          <mesh position={[0, 0.12 + 0.34 * liquid, 0]} scale={[1, liquid, 1]}>
            <cylinderGeometry args={[0.155, 0.14, 0.7, 24]} />
            <meshStandardMaterial color="#c47a12" roughness={0.35} />
          </mesh>
        ) : null}
        {fill > 0.08 ? (
          <mesh position={[0, 0.14 + 0.7 * liquid, 0]}>
            <cylinderGeometry args={[0.158, 0.158, 0.12, 24]} />
            <meshStandardMaterial color="#f3eee4" roughness={0.85} />
          </mesh>
        ) : null}
        <Html
          position={[0, 1.28, 0]}
          center
          sprite
          zIndexRange={[20, 0]}
          style={{ pointerEvents: "none" }}
        >
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onDrink();
            }}
            onPointerDown={(event) => {
              event.stopPropagation();
              onDrink();
            }}
            className="pointer-events-auto rounded-[2px] border border-border bg-background/90 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.08em] text-foreground shadow-elevated backdrop-blur-sm"
          >
            Beber
          </button>
        </Html>
      </group>
    </group>
  );
}

function Coaster({ position }: { position: [number, number, number] }) {
  return (
    <mesh position={position} rotation={[-Math.PI / 2, 0, 0.2]} receiveShadow>
      <circleGeometry args={[0.28, 24]} />
      <meshStandardMaterial color="#6b1c1c" roughness={0.9} />
    </mesh>
  );
}

function Bottle({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.48, 0]} castShadow>
        <cylinderGeometry args={[0.13, 0.15, 0.96, 18]} />
        <meshStandardMaterial color="#1a3a28" roughness={0.35} metalness={0.1} />
      </mesh>
      <mesh position={[0, 1.08, 0]} castShadow>
        <cylinderGeometry args={[0.05, 0.09, 0.38, 14]} />
        <meshStandardMaterial color="#1a3a28" roughness={0.35} />
      </mesh>
      <mesh position={[0, 1.3, 0]}>
        <cylinderGeometry args={[0.058, 0.058, 0.08, 14]} />
        <meshStandardMaterial color="#c9a227" roughness={0.4} metalness={0.3} />
      </mesh>
      <mesh position={[0, 0.5, 0.131]}>
        <planeGeometry args={[0.16, 0.42]} />
        <meshStandardMaterial color="#ead7a8" roughness={0.8} />
      </mesh>
    </group>
  );
}

function Bowl({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh rotation={[Math.PI, 0, 0]} castShadow>
        <cylinderGeometry args={[0.22, 0.16, 0.12, 20, 1, true]} />
        <meshStandardMaterial color="#8a6a42" roughness={0.7} side={DoubleSide} />
      </mesh>
      <mesh position={[0, 0.02, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 0.04, 16]} />
        <meshStandardMaterial color="#d4b483" roughness={0.85} />
      </mesh>
    </group>
  );
}

function Lemon({ position }: { position: [number, number, number] }) {
  return (
    <group position={position} rotation={[0.4, 0.6, 0.2]}>
      <mesh castShadow>
        <sphereGeometry args={[0.1, 16, 12]} />
        <meshStandardMaterial color="#c6d94a" roughness={0.7} />
      </mesh>
      <mesh position={[0.07, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.1, 0.1, 0.02, 16]} />
        <meshStandardMaterial color="#f4f0c8" roughness={0.6} />
      </mesh>
    </group>
  );
}

function WetRing({ position }: { position: [number, number, number] }) {
  return (
    <mesh position={position} rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[0.16, 0.22, 32]} />
      <meshStandardMaterial
        color="#8aa0b8"
        transparent
        opacity={0.18}
        roughness={0.2}
      />
    </mesh>
  );
}

function Chair({
  position,
  rotation = 0,
}: {
  position: [number, number, number];
  rotation?: number;
}) {
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      <mesh position={[0, -0.42, 0]} castShadow>
        <boxGeometry args={[0.55, 0.08, 0.55]} />
        <meshStandardMaterial color="#3a2414" roughness={0.8} />
      </mesh>
      <mesh position={[0, 0.02, -0.24]} castShadow>
        <boxGeometry args={[0.55, 0.72, 0.08]} />
        <meshStandardMaterial color="#3a2414" roughness={0.8} />
      </mesh>
      {(
        [
          [-0.22, -0.85, -0.22],
          [0.22, -0.85, -0.22],
          [-0.22, -0.85, 0.22],
          [0.22, -0.85, 0.22],
        ] as [number, number, number][]
      ).map((leg) => (
        <mesh key={leg.join(",")} position={leg}>
          <boxGeometry args={[0.07, 0.78, 0.07]} />
          <meshStandardMaterial color="#2a1a0e" roughness={0.9} />
        </mesh>
      ))}
    </group>
  );
}

function SideTable({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, -0.08, 0]} castShadow>
        <cylinderGeometry args={[0.55, 0.55, 0.08, 20]} />
        <meshStandardMaterial color="#4a321c" roughness={0.82} />
      </mesh>
      <mesh position={[0, -0.7, 0]}>
        <cylinderGeometry args={[0.07, 0.09, 1.16, 10]} />
        <meshStandardMaterial color="#2a1a0e" roughness={0.9} />
      </mesh>
    </group>
  );
}

function MenuCard({ position }: { position: [number, number, number] }) {
  return (
    <group position={position} rotation={[-0.15, 0.4, 0]}>
      <mesh castShadow>
        <boxGeometry args={[0.22, 0.32, 0.02]} />
        <meshStandardMaterial color="#f2ead9" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.02, 0.012]}>
        <planeGeometry args={[0.16, 0.22]} />
        <meshStandardMaterial color="#1e4d8c" roughness={0.7} />
      </mesh>
    </group>
  );
}
