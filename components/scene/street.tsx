"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";

export function Street() {
  return (
    <group>
      <Ground />
      <Sidewalk />
      <Curb />
      <Road />
      <Crosswalk />
      <OppositeSidewalk />
      <Awning />
      <Facade />
      <Lamps />
      <Bollards />
      <Planters />
      <StreetFurniture />
      <Trees />
      <Parked />
      <Traffic />
    </group>
  );
}

function Ground() {
  return (
    <mesh position={[0, -1.62, 4]} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[80, 36]} />
      <meshStandardMaterial color="#9aa3a8" roughness={1} />
    </mesh>
  );
}

function Sidewalk() {
  return (
    <group>
      <mesh position={[0, -1.3, -0.45]} receiveShadow>
        <boxGeometry args={[52, 0.12, 6.6]} />
        <meshStandardMaterial color="#cfc8bc" roughness={0.95} />
      </mesh>
      {Array.from({ length: 18 }, (_, i) => (
        <mesh
          key={i}
          position={[-20.4 + i * 2.4, -1.236, -0.45]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <planeGeometry args={[2.26, 6.4]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? "#d5cfc4" : "#c9c2b6"}
            roughness={0.98}
          />
        </mesh>
      ))}
    </group>
  );
}

function Curb() {
  return (
    <mesh position={[0, -1.2, 2.82]} receiveShadow castShadow>
      <boxGeometry args={[52, 0.22, 0.28]} />
      <meshStandardMaterial color="#b7b1a6" roughness={0.9} />
    </mesh>
  );
}

function Road() {
  return (
    <group>
      <mesh position={[0, -1.5, 5.7]} receiveShadow>
        <boxGeometry args={[62, 0.1, 5.6]} />
        <meshStandardMaterial color="#3a3a3c" roughness={0.92} />
      </mesh>
      {Array.from({ length: 16 }, (_, i) => (
        <mesh
          key={`dash-${i}`}
          position={[-24 + i * 3.2, -1.445, 5.7]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <planeGeometry args={[1.45, 0.11]} />
          <meshStandardMaterial color="#e8d56a" roughness={0.55} />
        </mesh>
      ))}
      {[-2.4, 2.4].map((z) =>
        Array.from({ length: 20 }, (_, i) => (
          <mesh
            key={`edge-${z}-${i}`}
            position={[-28 + i * 3, -1.445, 5.7 + z]}
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <planeGeometry args={[1.6, 0.06]} />
            <meshStandardMaterial color="#eceae4" roughness={0.7} />
          </mesh>
        )),
      )}
      {[-10, -2, 6, 14].map((x) => (
        <mesh
          key={`manhole-${x}`}
          position={[x, -1.445, 4.15]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <circleGeometry args={[0.22, 16]} />
          <meshStandardMaterial color="#2a2a2c" roughness={0.8} metalness={0.2} />
        </mesh>
      ))}
    </group>
  );
}

function Crosswalk() {
  return (
    <group position={[-8.2, -1.445, 5.7]}>
      {Array.from({ length: 8 }, (_, i) => (
        <mesh key={i} position={[0, 0, -2.45 + i * 0.7]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[2.6, 0.34]} />
          <meshStandardMaterial color="#efeee9" roughness={0.7} />
        </mesh>
      ))}
    </group>
  );
}

function OppositeSidewalk() {
  return (
    <group>
      <mesh position={[0, -1.3, 10.4]} receiveShadow>
        <boxGeometry args={[52, 0.12, 1.6]} />
        <meshStandardMaterial color="#c9c2b6" roughness={0.95} />
      </mesh>
      <mesh position={[0, -1.2, 9.55]} receiveShadow>
        <boxGeometry args={[52, 0.18, 0.22]} />
        <meshStandardMaterial color="#b7b1a6" roughness={0.9} />
      </mesh>
      {(
        [
          [-12, "#d8cfc0", 3.4],
          [-6.2, "#c9b8a4", 4.2],
          [0.4, "#e8ddd0", 3.8],
          [6.8, "#d2c4b2", 4.8],
          [13.2, "#cfc3b0", 3.6],
        ] as [number, string, number][]
      ).map(([x, color, height]) => (
        <group key={x} position={[x, height / 2 - 1.24, 11.35]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[5.4, height, 1.6]} />
            <meshStandardMaterial color={color} roughness={0.88} />
          </mesh>
          {[-1.3, 0, 1.3].map((wx) => (
            <mesh key={wx} position={[wx, 0.15, 0.82]}>
              <boxGeometry args={[0.9, 1.1, 0.06]} />
              <meshStandardMaterial color="#7eb7d8" roughness={0.25} metalness={0.08} />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
}

function Awning() {
  return (
    <group position={[0, 2.55, -2.55]}>
      <mesh rotation={[-0.12, 0, 0]} castShadow>
        <boxGeometry args={[8.4, 0.05, 1.35]} />
        <meshStandardMaterial color="#9a2f2f" roughness={0.7} />
      </mesh>
      {Array.from({ length: 9 }, (_, i) => (
        <mesh
          key={i}
          position={[-3.6 + i * 0.9, 0.02, 0]}
          rotation={[-0.12, 0, 0]}
        >
          <boxGeometry args={[0.42, 0.055, 1.36]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? "#c43b3b" : "#f4efe0"}
            roughness={0.75}
          />
        </mesh>
      ))}
    </group>
  );
}

function Facade() {
  return (
    <group position={[0, 0.55, -3.85]}>
      <mesh receiveShadow>
        <boxGeometry args={[24, 5.6, 0.5]} />
        <meshStandardMaterial color="#e4d9c8" roughness={0.88} />
      </mesh>
      <mesh position={[0, 1.85, 0.28]}>
        <boxGeometry args={[5.4, 0.7, 0.08]} />
        <meshStandardMaterial color="#1e1e1e" roughness={0.4} />
      </mesh>
      <mesh position={[0, 1.85, 0.34]}>
        <boxGeometry args={[4.6, 0.38, 0.04]} />
        <meshStandardMaterial color="#f4efe0" roughness={0.7} />
      </mesh>
      {[-4.4, 4.4].map((x) => (
        <mesh key={x} position={[x, 0.15, 0.28]}>
          <boxGeometry args={[1.7, 2.1, 0.06]} />
          <meshStandardMaterial color="#8ec4e6" roughness={0.2} metalness={0.1} />
        </mesh>
      ))}
      <mesh position={[0, -0.55, 0.28]}>
        <boxGeometry args={[1.35, 2.5, 0.08]} />
        <meshStandardMaterial color="#3d2918" roughness={0.75} />
      </mesh>
    </group>
  );
}

function Lamps() {
  return (
    <>
      <Lamp position={[-10.4, 0, 2.55]} />
      <Lamp position={[-3.6, 0, 2.55]} />
      <Lamp position={[3.4, 0, 2.55]} />
      <Lamp position={[10.6, 0, 2.55]} />
    </>
  );
}

function Lamp({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, -0.4, 0]} castShadow>
        <cylinderGeometry args={[0.07, 0.09, 1.8, 10]} />
        <meshStandardMaterial color="#2c2c2c" roughness={0.55} metalness={0.3} />
      </mesh>
      <mesh position={[0.42, 0.55, 0]} rotation={[0, 0, -0.75]} castShadow>
        <cylinderGeometry args={[0.035, 0.035, 0.85, 8]} />
        <meshStandardMaterial color="#2c2c2c" roughness={0.55} metalness={0.3} />
      </mesh>
      <mesh position={[0.78, 0.32, 0]}>
        <boxGeometry args={[0.26, 0.12, 0.26]} />
        <meshStandardMaterial color="#f4efe0" emissive="#ffe7b0" emissiveIntensity={0.08} />
      </mesh>
    </group>
  );
}

function Bollards() {
  const xs = [-12, -8.6, -5.4, -1.2, 2.2, 6.4, 9.8];
  return (
    <>
      {xs.map((x) => (
        <mesh key={x} position={[x, -0.92, 2.52]} castShadow>
          <cylinderGeometry args={[0.07, 0.08, 0.58, 10]} />
          <meshStandardMaterial color="#c43b3b" roughness={0.5} metalness={0.15} />
        </mesh>
      ))}
    </>
  );
}

function Planters() {
  return (
    <>
      <Planter position={[-6.4, 0, 1.85]} />
      <Planter position={[5.6, 0, 1.85]} />
    </>
  );
}

function Planter({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, -1.02, 0]} castShadow>
        <cylinderGeometry args={[0.3, 0.25, 0.44, 12]} />
        <meshStandardMaterial color="#6b4a32" roughness={0.85} />
      </mesh>
      <mesh position={[0, -0.76, 0]}>
        <sphereGeometry args={[0.28, 10, 8]} />
        <meshStandardMaterial color="#2f5c38" roughness={0.9} />
      </mesh>
    </group>
  );
}

function Trees() {
  return (
    <>
      <Tree position={[-14.2, 0, 1.7]} />
      <Tree position={[12.4, 0, 1.7]} />
    </>
  );
}

function Tree({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, -0.15, 0]} castShadow>
        <cylinderGeometry args={[0.1, 0.14, 2.2, 8]} />
        <meshStandardMaterial color="#4a321c" roughness={0.9} />
      </mesh>
      <mesh position={[0, 1.15, 0]} castShadow>
        <sphereGeometry args={[0.85, 12, 10]} />
        <meshStandardMaterial color="#2f5c38" roughness={0.92} />
      </mesh>
      <mesh position={[0.35, 1.35, 0.2]}>
        <sphereGeometry args={[0.55, 10, 8]} />
        <meshStandardMaterial color="#3d7346" roughness={0.92} />
      </mesh>
    </group>
  );
}

function StreetFurniture() {
  return (
    <group>
      <group position={[-2.15, -1.02, 2.35]}>
        <mesh castShadow>
          <boxGeometry args={[0.22, 0.55, 0.22]} />
          <meshStandardMaterial color="#c43b3b" roughness={0.45} metalness={0.2} />
        </mesh>
        <mesh position={[0, 0.32, 0]}>
          <sphereGeometry args={[0.14, 12, 10]} />
          <meshStandardMaterial color="#c43b3b" roughness={0.4} metalness={0.2} />
        </mesh>
      </group>
      <group position={[7.4, -0.95, 2.15]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.18, 0.2, 0.7, 12]} />
          <meshStandardMaterial color="#3a3a3c" roughness={0.7} />
        </mesh>
        <mesh position={[0, 0.32, 0]}>
          <cylinderGeometry args={[0.2, 0.18, 0.08, 12]} />
          <meshStandardMaterial color="#2a2a2c" roughness={0.6} />
        </mesh>
      </group>
      <group position={[-8.2, -0.2, 2.55]}>
        <mesh position={[0, -0.2, 0]} castShadow>
          <boxGeometry args={[0.12, 2.1, 0.12]} />
          <meshStandardMaterial color="#2c2c2c" roughness={0.5} />
        </mesh>
        <mesh position={[0, 0.72, 0.08]} rotation={[0.1, 0, 0]}>
          <boxGeometry args={[0.7, 1.35, 0.04]} />
          <meshStandardMaterial color="#1e1e1e" roughness={0.4} />
        </mesh>
        <mesh position={[-0.08, 1.05, 0.11]}>
          <boxGeometry args={[0.22, 0.22, 0.02]} />
          <meshStandardMaterial color="#c43b3b" emissive="#c43b3b" emissiveIntensity={0.4} />
        </mesh>
        <mesh position={[-0.08, 0.78, 0.11]}>
          <boxGeometry args={[0.22, 0.22, 0.02]} />
          <meshStandardMaterial color="#e8d56a" emissive="#e8d56a" emissiveIntensity={0.35} />
        </mesh>
        <mesh position={[-0.08, 0.51, 0.11]}>
          <boxGeometry args={[0.22, 0.22, 0.02]} />
          <meshStandardMaterial color="#2f5c38" emissive="#2f5c38" emissiveIntensity={0.3} />
        </mesh>
      </group>
      <group position={[2.55, -0.95, -2.35]}>
        <mesh rotation={[0, 0.4, 0]} castShadow>
          <boxGeometry args={[0.7, 0.7, 0.18]} />
          <meshStandardMaterial color="#4a321c" roughness={0.85} />
        </mesh>
      </group>
    </group>
  );
}

function Parked() {
  return (
    <>
      <group position={[9.6, -1.22, 3.35]} rotation={[0, -0.08, 0]}>
        <CarBody color="#1e1e1e" cabin="#9aa3ad" length={1.85} />
      </group>
      <group position={[-11.4, -1.08, 2.25]} rotation={[0, 0.5, 0]}>
        <mesh position={[0, 0.18, 0]} castShadow>
          <boxGeometry args={[1.15, 0.28, 0.38]} />
          <meshStandardMaterial color="#51a2ff" roughness={0.4} metalness={0.2} />
        </mesh>
        <mesh position={[-0.12, 0.38, 0]} castShadow>
          <boxGeometry args={[0.42, 0.28, 0.34]} />
          <meshStandardMaterial color="#1e1e1e" roughness={0.35} />
        </mesh>
        <Wheel position={[0.38, 0.08, 0.22]} />
        <Wheel position={[0.38, 0.08, -0.22]} />
        <Wheel position={[-0.38, 0.08, 0.22]} />
        <Wheel position={[-0.38, 0.08, -0.22]} />
      </group>
    </>
  );
}

const CARS: {
  color: string;
  cabin: string;
  lane: number;
  speed: number;
  start: number;
  kind?: "car" | "van";
}[] = [
  { color: "#51a2ff", cabin: "#d8eefc", lane: 3.95, speed: 4.4, start: -18 },
  { color: "#c43b3b", cabin: "#f0d4d4", lane: 3.95, speed: 5.2, start: -6 },
  { color: "#e8d56a", cabin: "#f7f1d2", lane: 3.95, speed: 3.7, start: 5, kind: "van" },
  { color: "#f6f6f6", cabin: "#c5d0da", lane: 3.95, speed: 4.9, start: 16 },
  { color: "#1e1e1e", cabin: "#9aa3ad", lane: 7.35, speed: -5.0, start: 18 },
  { color: "#2f5c38", cabin: "#d5e4d8", lane: 7.35, speed: -3.8, start: 4 },
  { color: "#7a3ee8", cabin: "#e4d8f8", lane: 7.35, speed: -4.6, start: -8 },
  { color: "#f4efe0", cabin: "#c9d4de", lane: 7.35, speed: -5.5, start: -20, kind: "van" },
];

function Traffic() {
  return (
    <>
      {CARS.map((car, i) => (
        <MovingVehicle key={i} {...car} />
      ))}
    </>
  );
}

function MovingVehicle({
  color,
  cabin,
  lane,
  speed,
  start,
  kind = "car",
}: {
  color: string;
  cabin: string;
  lane: number;
  speed: number;
  start: number;
  kind?: "car" | "van";
}) {
  const ref = useRef<Group>(null);

  useFrame((_, delta) => {
    const group = ref.current;
    if (!group) return;
    group.position.x += speed * delta;
    if (speed > 0 && group.position.x > 28) group.position.x = -28;
    if (speed < 0 && group.position.x < -28) group.position.x = 28;
  });

  return (
    <group ref={ref} position={[start, -1.2, lane]} rotation={[0, speed < 0 ? Math.PI : 0, 0]}>
      <CarBody color={color} cabin={cabin} length={kind === "van" ? 2.35 : 1.75} />
    </group>
  );
}

function CarBody({
  color,
  cabin,
  length,
}: {
  color: string;
  cabin: string;
  length: number;
}) {
  const cabinLen = length * 0.52;
  return (
    <group>
      <mesh position={[0, 0.24, 0]} castShadow>
        <boxGeometry args={[length, 0.4, 0.82]} />
        <meshStandardMaterial color={color} roughness={0.42} metalness={0.18} />
      </mesh>
      <mesh position={[-length * 0.08, 0.52, 0]} castShadow>
        <boxGeometry args={[cabinLen, 0.34, 0.74]} />
        <meshStandardMaterial color={cabin} roughness={0.22} metalness={0.06} />
      </mesh>
      <Wheel position={[length * 0.28, 0.1, 0.42]} />
      <Wheel position={[length * 0.28, 0.1, -0.42]} />
      <Wheel position={[-length * 0.28, 0.1, 0.42]} />
      <Wheel position={[-length * 0.28, 0.1, -0.42]} />
      <mesh position={[length * 0.48, 0.24, 0.24]}>
        <boxGeometry args={[0.06, 0.08, 0.16]} />
        <meshStandardMaterial color="#f4efe0" emissive="#ffe7b0" emissiveIntensity={0.55} />
      </mesh>
      <mesh position={[length * 0.48, 0.24, -0.24]}>
        <boxGeometry args={[0.06, 0.08, 0.16]} />
        <meshStandardMaterial color="#f4efe0" emissive="#ffe7b0" emissiveIntensity={0.55} />
      </mesh>
      <mesh position={[-length * 0.48, 0.24, 0.24]}>
        <boxGeometry args={[0.05, 0.08, 0.16]} />
        <meshStandardMaterial color="#c43b3b" emissive="#c43b3b" emissiveIntensity={0.35} />
      </mesh>
      <mesh position={[-length * 0.48, 0.24, -0.24]}>
        <boxGeometry args={[0.05, 0.08, 0.16]} />
        <meshStandardMaterial color="#c43b3b" emissive="#c43b3b" emissiveIntensity={0.35} />
      </mesh>
    </group>
  );
}

function Wheel({ position }: { position: [number, number, number] }) {
  return (
    <mesh position={position} rotation={[0, 0, Math.PI / 2]} castShadow>
      <cylinderGeometry args={[0.15, 0.15, 0.13, 12]} />
      <meshStandardMaterial color="#1a1a1a" roughness={0.7} />
    </mesh>
  );
}
