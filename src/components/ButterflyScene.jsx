import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import Butterfly3D from "./Butterfly3D";
import { Suspense } from "react";
import * as THREE from "three";

export default function ButterflyScene() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 2, 6], fov: 50 }}
        gl={{ outputColorSpace: THREE.SRGBColorSpace }}
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[5, 10, 5]} intensity={1.5} />
        <Suspense fallback={null}>
          <Butterfly3D />
        </Suspense>
        <Environment preset="sunset" />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
}
