"use client";
import { motion } from "framer-motion";

const Transition = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden pointer-events-none">
      <motion.div
        className="absolute inset-0 bg-black"
        initial={{ opacity: 0 }}
        animate={{
          opacity: 0.85,
          transition: {
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
          },
        }}
        exit={{
          opacity: 0,
          transition: {
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
            delay: 0.2,
          },
        }}
      />

      <motion.div
        className="relative flex items-center justify-center"
        initial={{
          scale: 0.4,
          opacity: 0,
          filter: "blur(15px)",
        }}
        animate={{
          scale: 1,
          opacity: 1,
          filter: "blur(0px)",
          transition: {
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
          },
        }}
        exit={{
          scale: 1.5,
          opacity: 0,
          filter: "blur(10px)",
          transition: {
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
          },
        }}
      >
        <div className="flex items-center justify-center w-24 h-24 relative">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 bg-white rounded-full"
              style={{
                top: `${50 - 35 * Math.sin(i * (Math.PI / 4))}%`,
                left: `${50 + 35 * Math.cos(i * (Math.PI / 4))}%`,
              }}
              initial={{ opacity: 0.2, scale: 1 }}
              animate={{
                opacity: [0.2, 1, 0.2],
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
                delay: i * 0.15,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Transition;
