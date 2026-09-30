"use client";

import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, OrbitControls, Sky } from "@react-three/drei";
import { BarProps } from "@/components/scene/bar-props";
import { NapkinPad, NotesLayer } from "@/components/scene/napkins";
import { Street } from "@/components/scene/street";
import { TrashCan } from "@/components/scene/trash-can";
import type { Note } from "@/lib/notes";

export function BarScene({
  notes,
  onOpenPad,
  onSelectNote,
  onMoveNote,
  onTrashNote,
  onDrink,
  drinking,
  fill,
}: {
  notes: Note[];
  onOpenPad: () => void;
  onSelectNote: (note: Note) => void;
  onMoveNote: (id: string, x: number, z: number) => void;
  onTrashNote: (id: string) => void;
  onDrink: () => void;
  drinking: boolean;
  fill: number;
}) {
  const [hotTrash, setHotTrash] = useState(false);

  return (
    <Canvas
      shadows
      dpr={[1, 1.8]}
      camera={{ position: [4.85, 3.85, 3.35], fov: 38, near: 0.1, far: 200 }}
      gl={{ antialias: true }}
      className="h-full w-full"
    >
      <color attach="background" args={["#9ec9e8"]} />
      <Sky
        sunPosition={[18, 32, 12]}
        turbidity={4.5}
        rayleigh={0.65}
        mieCoefficient={0.004}
        mieDirectionalG={0.8}
      />
      <fog attach="fog" args={["#9ec9e8", 28, 90]} />

      <ambientLight intensity={0.72} />
      <hemisphereLight color="#c5e4ff" groundColor="#e4d2b0" intensity={1.05} />
      <directionalLight
        position={[14, 24, 10]}
        intensity={2.7}
        color="#fffaf0"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-far={52}
        shadow-camera-left={-18}
        shadow-camera-right={18}
        shadow-camera-top={18}
        shadow-camera-bottom={-18}
      />

      <Street />
      <Table />
      <BarProps onDrink={onDrink} drinking={drinking} fill={fill} />
      <TrashCan hot={hotTrash} />
      <NapkinPad onOpen={onOpenPad} />
      <NotesLayer
        notes={notes}
        onSelect={onSelectNote}
        onMove={onMoveNote}
        onTrash={onTrashNote}
        onDragging={(_, overTrash) => {
          setHotTrash(overTrash);
        }}
      />

      <ContactShadows
        position={[0, -1.236, 0.4]}
        opacity={0.22}
        scale={16}
        blur={2.4}
        far={6}
        color="#3a3228"
      />

      <OrbitControls
        makeDefault
        enablePan={false}
        enableRotate
        enableZoom
        minDistance={3.8}
        maxDistance={16}
        minPolarAngle={0.35}
        maxPolarAngle={1.35}
        target={[0.05, 0.12, 0.35]}
      />
    </Canvas>
  );
}

function Table() {
  return (
    <group>
      <mesh position={[0, -0.06, 0]} receiveShadow castShadow>
        <boxGeometry args={[4.5, 0.12, 2.55]} />
        <meshStandardMaterial color="#4a321c" roughness={0.82} />
      </mesh>
      <mesh position={[0, -0.01, 0]} receiveShadow>
        <boxGeometry args={[4.35, 0.02, 2.4]} />
        <meshStandardMaterial color="#5a3d22" roughness={0.7} />
      </mesh>
      {(
        [
          [-1.95, -0.72, -1.05],
          [1.95, -0.72, -1.05],
          [-1.95, -0.72, 1.05],
          [1.95, -0.72, 1.05],
        ] as [number, number, number][]
      ).map((position) => (
        <mesh key={position.join(",")} position={position}>
          <boxGeometry args={[0.14, 1.22, 0.14]} />
          <meshStandardMaterial color="#2a1a0e" roughness={0.9} />
        </mesh>
      ))}
    </group>
  );
}
