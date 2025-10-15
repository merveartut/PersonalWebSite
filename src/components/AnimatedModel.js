import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, SkeletonHelper } from "@react-three/drei";
import * as THREE from "three";

const AnimatedModel = () => {
  const group = useRef();
  const { scene, animations } = useGLTF("/assets/models/butterfly.glb");

  // Mixer for animations
  const mixer = useRef();
  const clock = new THREE.Clock();

  // Initialize the animations
  React.useEffect(() => {
    mixer.current = new THREE.AnimationMixer(scene);
    animations.forEach((clip) => mixer.current.clipAction(clip).play());
  }, [animations, scene]);

  // Update the animation in the render loop
  useFrame(() => {
    const delta = clock.getDelta();
    mixer.current?.update(delta);
  });

  return (
    <group ref={group}>
      <primitive object={scene} />
      <SkeletonHelper object={scene} />
    </group>
  );
};

export default AnimatedModel;
