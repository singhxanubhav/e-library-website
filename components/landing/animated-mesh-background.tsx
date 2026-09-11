"use client";

import { motion } from "framer-motion";

export function AnimatedMeshBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Dynamic ambient orb 1: Electric Blue */}
      <motion.div
        className="absolute -top-32 left-1/4 h-[500px] w-[500px] rounded-full bg-electric-500/20 blur-[130px] dark:bg-electric-500/15"
        animate={{
          x: [0, 60, -40, 0],
          y: [0, -50, 40, 0],
          scale: [1, 1.15, 0.95, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Dynamic ambient orb 2: Purple Accent */}
      <motion.div
        className="absolute top-1/4 right-10 h-[450px] w-[450px] rounded-full bg-purpleAccent-500/20 blur-[140px] dark:bg-purpleAccent-500/15"
        animate={{
          x: [0, -70, 50, 0],
          y: [0, 60, -30, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Dynamic ambient orb 3: Amber Highlight */}
      <motion.div
        className="absolute bottom-10 left-1/3 h-[380px] w-[380px] rounded-full bg-amberHighlight-500/15 blur-[120px] dark:bg-amberHighlight-500/10"
        animate={{
          x: [0, 40, -60, 0],
          y: [0, -40, 50, 0],
          scale: [1, 1.1, 0.92, 1],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Subtle grid texture overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px]" />
    </div>
  );
}
