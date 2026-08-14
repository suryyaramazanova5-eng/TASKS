import { motion } from "framer-motion";
import { useMemo } from "react";

export default function Petals() {
  const petals = useMemo(() => {
    return Array.from({ length: 70 }, () => ({
      size: 8 + Math.random() * 8,
      left: Math.random() * 100,
      duration: 10 + Math.random() * 8,
      delay: Math.random() * 10,
      drift: Math.random() * 80 - 40,
      rotate: Math.random() * 360,
    }));
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 100,
      }}
    >
      {petals.map((petal, i) => (
        <motion.div
          key={i}
          initial={{
            x: `${petal.left}vw`,
            y: -80,
            rotate: petal.rotate,
            opacity: 0,
          }}
          animate={{
            y: "110vh",
            x: [
              `${petal.left}vw`,
              `calc(${petal.left}vw + ${petal.drift}px)`,
              `calc(${petal.left}vw - ${petal.drift}px)`,
              `${petal.left}vw`,
            ],
            rotate: [
              petal.rotate,
              petal.rotate + 180,
              petal.rotate + 360,
            ],
            opacity: [0, 1, 1, 0],
            scale: [0.7, 1, 0.9],
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            position: "absolute",
            width: petal.size,
            height: petal.size * 1.3,
            borderRadius: "55% 45% 55% 45%",
            background:
              "linear-gradient(145deg, #fdf4f8, #f5d0d8, #faaab8, #f29eb5)", // Açıq çəhrayıdan daha yumşaq tona keçid
            boxShadow:
              "inset -3px -3px 6px rgba(255,255,255,.9), inset 3px 3px 6px rgba(242,158,181,.2), 0 8px 12px rgba(0,0,0,.1)", // Həcm üçün kölgələr rəngə uyğunlaşdırılıb
            filter: "blur(.4px)",
          }}
        />
      ))}
    </div>
  );
}