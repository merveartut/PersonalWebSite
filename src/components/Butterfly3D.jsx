import * as THREE from "three";
import React, { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import butterflyTexture from "../../public/assets/gltf_embedded_0.png";

export default function Butterfly3D(props) {
  const group = useRef();
  const { scene, materials, animations } = useGLTF("/assets/butterfly.glb");
  const texture = new THREE.TextureLoader().load(butterflyTexture);

  const mixer = useRef();
  const t = useRef(0);

  if (materials.ButterflyMaterial) {
    materials.ButterflyMaterial.map = texture;
    materials.ButterflyMaterial.needsUpdate = true;
  }

  // Update animation mixer (wingbeat)
  useFrame((state, delta) => {
    if (mixer.current) mixer.current.update(delta);

    if (!group.current) return;

    t.current += delta * 0.3; // speed of flying

    // Smooth flying path
    const x = Math.sin(t.current * 0.7) * 4; // wider path
    const y = Math.sin(t.current * 0.5) * 2 + 2; // up/down motion
    const z = Math.cos(t.current * 0.7) * 4; // forward/backward
    group.current.position.set(x, y, z);

    // Gentle rotation to make it feel more natural
    group.current.rotation.y = Math.sin(t.current * 0.3) * 0.5;
    group.current.rotation.x = Math.sin(t.current * 0.2) * 0.2;
  });

  useEffect(() => {
    if (animations && animations.length) {
      mixer.current = new THREE.AnimationMixer(scene);
      animations.forEach((clip) => {
        const action = mixer.current.clipAction(clip);
        action.play();
        action.timeScale = 0.5; // slower wingbeat
      });
    }
  }, [animations, scene]);

  return (
    <group ref={group} scale={3} {...props}>
      {" "}
      {/* bigger butterfly */}
      <primitive object={scene} />
    </group>
  );
}
