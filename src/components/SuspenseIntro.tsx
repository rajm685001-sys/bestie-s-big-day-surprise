import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import starryBg from "@/assets/starry-bg.jpg";

const STAR_COUNT = 80;
const COUNTDOWN_FROM = 10;

const generateStars = () =>
  Array.from({ length: STAR_COUNT }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    delay: Math.random() * 3,
    duration: Math.random() * 2 + 1.5,
  }));

const SuspenseIntro = ({ onComplete }: { onComplete: () => void }) => {
  const [count, setCount] = useState(COUNTDOWN_FROM);
  const [stars] = useState(generateStars);

  const finish = useCallback(() => {
    onComplete();
  }, [onComplete]);

  useEffect(() => {
    if (count <= 0) {
      const t = setTimeout(finish, 600);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setCount((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [count, finish]);

  return (
    <AnimatePresence>
      {count >= 0 && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
          style={{
            backgroundImage: `url(${starryBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40" />

          {/* Stars */}
          {stars.map((star) => (
            <div
              key={star.id}
              className="absolute rounded-full bg-star-glow animate-twinkle"
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: star.size,
                height: star.size,
                animationDelay: `${star.delay}s`,
                animationDuration: `${star.duration}s`,
              }}
            />
          ))}

          {/* Glowing message */}
          <motion.p
            className="glow-text font-handwritten text-xl md:text-2xl mb-8 text-center px-4 z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Shhh... Manyuuuuuu's epic bday awaits! ✨
          </motion.p>

          {/* Countdown number */}
          <AnimatePresence mode="wait">
            <motion.div
              key={count}
              className="glow-text font-display text-8xl md:text-9xl animate-heartbeat z-10"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              {count > 0 ? count : "🎉"}
            </motion.div>
          </AnimatePresence>

          <motion.p
            className="glow-text font-handwritten text-lg mt-6 opacity-60 z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 1.5 }}
          >
            Get ready for the best bday surprise ever...
          </motion.p>

          {/* Skip button */}
          {count > 2 && (
            <motion.button
              className="absolute bottom-8 text-sm opacity-40 hover:opacity-80 transition-opacity z-10"
              style={{ color: "hsl(45 100% 90%)" }}
              onClick={finish}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              transition={{ delay: 3 }}
            >
              Skip →
            </motion.button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SuspenseIntro;
