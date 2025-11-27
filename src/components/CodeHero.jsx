// src/components/CodeHero.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars, Text } from "@react-three/drei";
import * as THREE from "three";

// 3D Text Component
const FloatingText = ({ children, position, color, ...props }) => {
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);

  return (
    <Text
      fontSize={0.8}
      color={color}
      position={position}
      anchorX="center"
      anchorY="middle"
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => setActive(!active)}
      {...props}
    >
      {children}
    </Text>
  );
};

// Hologram Shader Material (simple example)
const HologramMaterial = ({ color }) => (
  <shaderMaterial
    attach="material"
    args={[{
      uniforms: {
        color: { value: new THREE.Color(color) },
        time: { value: 0 }
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 color;
        uniform float time;
        varying vec2 vUv;

        void main() {
          vec2 p = vUv * 2.0 - 1.0;
          float fade = 1.0 - abs(p.y) * 0.5;
          float pulse = sin(time * 5.0 + p.x * 10.0) * 0.1 + 0.9;
          gl_FragColor = vec4(color * fade * pulse, 0.8);
        }
      `,
      transparent: true,
    }]}
  />
);


const CodeHero = ({ onExplore }) => {
  const { theme } = useTheme();
  const [code, setCode] = useState(`console.log("Merhaba, Dünya!");`);
  const [output, setOutput] = useState("");
  const [name, setName] = useState("Merve Artut"); // Dinamik isim

  useEffect(() => {
    // Tema değiştikçe kodu güncelle
    if (theme === "hacker") {
      setCode(`// Hacker Moduna Hoş Geldiniz, Ziyaretçi!\nfunction greet(name) {\n  return "Kabul Edildi: " + name + " Protokolü Aktif.\\nVeriler Akıyor...";\n}\n\nconsole.log(greet("${name}"));`);
    } else {
      setCode(`console.log("Merhaba, ${name}!");`);
    }
  }, [theme, name]); // name bağımlılığı eklendi

  const runCode = () => {
    try {
      // Güvenli eval uygulaması veya web worker kullanımı önerilir gerçek projelerde
      // Basit bir demo için string manipülasyonu yapalım
      let currentCode = code;
      let newOutput = "";

      if (theme === "hacker") {
        newOutput = `Kabul Edildi: ${name} Protokolü Aktif.\nVeriler Akıyor...`;
      } else {
        newOutput = `Merhaba, ${name}!`;
      }
      
      setOutput(newOutput);
    } catch (error) {
      setOutput(`Hata: ${error.message}`);
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  // Animasyon varyantları
  const textVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const codeEditorVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8, delay: 0.3 } },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.6 } },
  };

  const getCodeEditorTheme = () => {
    if (theme === "dark") return "bg-gray-800 text-gray-50";
    if (theme === "hacker") return "bg-hacker-background text-hacker-text border-hacker-primary font-mono";
    return "bg-gray-100 text-gray-900";
  };

  const getButtonTheme = () => {
    if (theme === "dark") return "bg-dark-primary hover:bg-dark-secondary text-white";
    if (theme === "hacker") return "bg-hacker-primary hover:bg-hacker-secondary text-black font-mono shadow-[0_0_10px_var(--color-primary)]";
    return "bg-primary hover:bg-secondary text-white";
  };

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center p-4 overflow-hidden">
      {/* 3D Arka Plan (Sadece Hacker modunda aktif) */}
      {theme === "hacker" && (
        <div className="absolute inset-0 z-0 opacity-20">
          <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />
            <HologramMaterial color={getComputedStyle(document.documentElement).getPropertyValue('--color-primary')} />
            <FloatingText position={[0, 1.5, 0]} color="var(--color-primary)" rotation={[0, 0, 0]}>
              Merve Artut
            </FloatingText>
            <FloatingText position={[0, -1.5, 0]} color="var(--color-secondary)" rotation={[0, 0, 0]}>
              Full Stack Developer
            </FloatingText>
            <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
          </Canvas>
        </div>
      )}

      <div className="relative z-10 flex flex-col items-center justify-center max-w-4xl mx-auto space-y-8 p-6 rounded-lg bg-white bg-opacity-10 dark:bg-black dark:bg-opacity-20 backdrop-blur-sm shadow-xl border border-gray-200 dark:border-gray-700">
        <motion.h1
          className="text-5xl md:text-6xl font-display font-bold text-center leading-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500 dark:from-purple-300 dark:to-pink-300 hacker:from-hacker-text hacker:to-hacker-primary hacker:text-shadow-[0_0_8px_var(--color-text)]"
          variants={textVariants}
          initial="hidden"
          animate="visible"
        >
          Hoş Geldiniz, Kodlama Macerasına
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-center text-gray-700 dark:text-gray-300 hacker:text-hacker-text hacker:font-mono max-w-2xl"
          variants={textVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
        >
          Aşağıdaki kodu çalıştırın veya isminizi değiştirerek çıktıyı kişiselleştirin.
        </motion.p>

        {/* Kod Editörü / Gösterim Alanı */}
        <motion.div
          className={`w-full max-w-2xl p-4 rounded-lg shadow-lg border-2 ${getCodeEditorTheme()} transition-all duration-500`}
          variants={codeEditorVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-gray-600 dark:text-gray-400 hacker:text-hacker-primary">index.js</span>
            <span className="text-xs text-gray-500 dark:text-gray-500 hacker:text-hacker-accent">Demo Terminal</span>
          </div>
          <pre className="whitespace-pre-wrap text-left text-sm md:text-base leading-relaxed overflow-x-auto">
            <code>
              {code.split('\n').map((line, index) => (
                <div key={index} className="flex">
                  <span className="mr-4 text-gray-400 dark:text-gray-600 hacker:text-hacker-secondary">{index + 1}</span>
                  {line.includes(`"${name}"`) ? (
                    <span className="text-yellow-400 dark:text-yellow-300 hacker:text-hacker-text animate-pulse">
                      {line.split(`"${name}"`)[0]}
                      <input
                        type="text"
                        value={name}
                        onChange={handleNameChange}
                        className="bg-transparent border-b border-dashed border-gray-400 dark:border-gray-600 hacker:border-hacker-primary focus:outline-none w-28 text-center text-current"
                        aria-label="İsminizi girin"
                      />
                      {line.split(`"${name}"`)[1]}
                    </span>
                  ) : (
                    <span>{line}</span>
                  )}
                </div>
              ))}
            </code>
          </pre>
        </motion.div>

        {/* Butonlar */}
        <motion.div className="flex gap-4" variants={buttonVariants} initial="hidden" animate="visible">
          <button
            onClick={runCode}
            className={`px-6 py-3 rounded-full text-lg font-semibold shadow-md transition-all duration-300 transform hover:-translate-y-1 ${getButtonTheme()}`}
          >
            Kodu Çalıştır
          </button>
          <button
            onClick={onExplore}
            className="px-6 py-3 rounded-full text-lg font-semibold text-gray-700 dark:text-gray-300 bg-transparent border-2 border-primary dark:border-dark-primary hover:bg-primary hover:text-white dark:hover:bg-dark-primary transition-all duration-300 transform hover:-translate-y-1 hacker:border-hacker-primary hacker:text-hacker-text hacker:hover:bg-hacker-primary hacker:hover:text-black"
          >
            Projeyi Keşfet
          </button>
        </motion.div>

        {/* Çıktı Terminali */}
        {output && (
          <motion.div
            className={`w-full max-w-2xl p-4 rounded-lg mt-4 shadow-lg border-t-4 ${
              theme === "hacker" ? "bg-hacker-background border-hacker-primary text-hacker-text font-mono" : "bg-gray-800 border-purple-500 text-gray-50"
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-md font-bold mb-2 hacker:text-hacker-primary">Çıktı:</h3>
            <pre className="whitespace-pre-wrap text-sm md:text-base">{output}</pre>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CodeHero;