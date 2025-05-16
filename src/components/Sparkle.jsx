import React from "react";
import { motion } from "framer-motion";
import { HiSparkles } from "react-icons/hi2";

const Sparkle = ({ x, y }) => {
  const sparkleCount = 8; // Number of sparkles
  const duration = 1.2;

  const generateSparkles = () => {
    return Array.from({ length: sparkleCount }).map((_, index) => {
      const size = Math.random() * 15 + 10; // Random size between 10px and 25px
      const angle = Math.random() * 270; // Random direction in degrees
      const distance = Math.random() * 80 + 60; // Random distance (50px to 150px)
      const delay = Math.random() * 0.3; // Random delay for staggered effect
      const rotation = Math.random() * 360; // Random rotation

      // Calculate target position based on angle and distance
      const targetX = Math.cos((angle * Math.PI) / 180) * distance;
      const targetY = Math.sin((angle * Math.PI) / 180) * distance;

      return (
        <motion.div
          key={index}
          initial={{ opacity: 1, scale: 1, x: 0, y: 0 }}
          animate={{
            opacity: 0,
            scale: 0.5,
            x: targetX,
            y: targetY,
          }}
          transition={{ duration, delay }}
          style={{
            position: "absolute",
            left: x,
            top: y,
            width: `${size}px`,
            height: `${size}px`,
            pointerEvents: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transformOrigin: "center",
          }}
        >
          <HiSparkles
            size={size}
            color="brown"
            style={{ transform: `rotate(${rotation}deg)` }}
          />
        </motion.div>
      );
    });
  };

  return <>{generateSparkles()}</>;
};

export default Sparkle;
