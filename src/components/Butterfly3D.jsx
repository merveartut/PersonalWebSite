import * as THREE from "three";
import React, { useRef, useEffect, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

export default function Butterfly3D(props) {
  const group = useRef();
  const { scene, animations } = useGLTF("/assets/butterfly.glb");
  const mixer = useRef();
  const t = useRef(0);
  const lastPos = useRef(new THREE.Vector3());

  const [isLanding, setIsLanding] = useState(false);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        const mat = child.material;
        if (mat.map) {
          mat.map.colorSpace = THREE.SRGBColorSpace;
          mat.map.needsUpdate = true;
        }
        mat.side = THREE.DoubleSide;
        mat.needsUpdate = true;
      }
    });
  }, [scene]);

  useEffect(() => {
    if (animations && animations.length > 0) {
      mixer.current = new THREE.AnimationMixer(scene);
      animations.forEach((clip) => {
        const action = mixer.current.clipAction(clip);
        action.play();
        action.timeScale = 1.0;
      });
    }
  }, [animations, scene]);

  useFrame((_, delta) => {
    if (mixer.current) mixer.current.update(delta);
    if (!group.current) return;

    setTimer((prev) => prev + delta);

    const radius = 4;

    // 🟣 Konma durumu yönetimi
    if (timer > 15 && !isLanding) {
      // Konmaya başla
      lastPos.current.copy(group.current.position); // bulunduğu yeri kaydet
      setIsLanding(true);
      setTimer(0);
    } else if (timer > 3 && isLanding) {
      // Kalkış
      setIsLanding(false);
      setTimer(0);

      // 💡 Uçuş fazını (t.current) bulunduğu konuma göre yeniden hesapla
      const { x, z } = lastPos.current;
      t.current = Math.atan2(x / radius, z / radius);
    }

    t.current += delta * 0.4;

    if (isLanding) {
      // 🦋 Profile image üstüne kon
      group.current.position.lerp(new THREE.Vector3(1.2, 0.6, 0), 0.05);
      group.current.rotation.x = 0.2;
      group.current.rotation.y = Math.PI;
      return;
    } else {
      t.current += delta * 0.4;

      const x = Math.sin(t.current * 0.8) * radius;
      const z = Math.cos(t.current * 0.8) * radius;
      const y = Math.sin(t.current * 1.2) * 1.5 + 2;
      group.current.position.set(x, y, z);

      // 🔹 Yönü düzelt
      const nextX = Math.sin((t.current + 0.01) * 0.8) * radius;
      const nextZ = Math.cos((t.current + 0.01) * 0.8) * radius;
      const dir = new THREE.Vector3(nextX - x, 0, nextZ - z).normalize();
      const angle = Math.atan2(dir.x, dir.z);
      group.current.rotation.y = angle + Math.PI;
      group.current.rotation.x = Math.sin(t.current * 0.5) * 0.2;
    }
  });

  return (
    <group ref={group} scale={1.4} {...props}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload("/assets/butterfly.glb");
