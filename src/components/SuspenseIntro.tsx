import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import starryBg from "@/assets/starry-bg.jpg";

const STAR_COUNT = 80;
const COUNTDOWN_FROM = 10;

const SUSPENSE_MESSAGES = [
  { text: "Shhh... something magical is about to happen ✨", at: 10 },
  { text: "The stars are aligning for someone special... 🌟", at: 8 },
  { text: "Can you feel the excitement? 💫", at: 6 },
  { text: "Almost there... hold your breath! 🤫", at: 4 },
  { text: "3... 2... 1... HERE IT COMES! 🎉", at: 2 },
];

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
  const [currentMessage, setCurrentMessage] = useState(0);

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

  // Update suspense message based on count
  useEffect(() => {
    const msgIndex = SUSPENSE_MESSAGES.findIndex((m) => count >= m.at);
    if (msgIndex >= 0) setCurrentMessage(msgIndex);
  }, [count]);

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
          {/* Overlay - gets darker as countdown progresses */}
          <div
            className="absolute inset-0 transition-colors duration-1000"
            style={{ backgroundColor: `rgba(0,0,0,${0.3 + (1 - count / COUNTDOWN_FROM) * 0.3})` }}
          />

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

          {/* Shooting stars that appear periodically */}
          {count > 2 && count % 3 === 0 && (
            <motion.div
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{ top: "20%", left: "10%" }}
              initial={{ x: 0, y: 0, opacity: 1 }}
              animate={{ x: 300, y: 200, opacity: 0 }}
              transition={{ duration: 1.5 }}
            >
              <div className="w-16 h-0.5 bg-gradient-to-l from-white to-transparent -translate-y-0.5" />
            </motion.div>
          )}

          {/* Glowing suspense message - changes with countdown */}
          <AnimatePresence mode="wait">
            <motion.p
              key={currentMessage}
              className="glow-text font-handwritten text-lg md:text-2xl mb-8 text-center px-6 z-10 max-w-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {SUSPENSE_MESSAGES[currentMessage]?.text}
            </motion.p>
          </AnimatePresence>

          {/* Countdown number with pulse ring */}
          <div className="relative z-10">
            {/* Pulse ring */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-primary/30"
              style={{ width: 120, height: 120, margin: "auto", top: -20, left: -20 }}
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            />
            <AnimatePresence mode="wait">
              <motion.div
                key={count}
                className="glow-text font-display text-8xl md:text-9xl animate-heartbeat"
                initial={{ scale: 0.5, opacity: 0, rotateX: 90 }}
                animate={{ scale: 1, opacity: 1, rotateX: 0 }}
                exit={{ scale: 1.5, opacity: 0, rotateX: -90 }}
                transition={{ duration: 0.4 }}
              >
                {count > 0 ? count : "🎉"}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Progress bar */}
          <div className="w-48 h-1 bg-white/10 rounded-full mt-8 z-10 overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ background: "linear-gradient(90deg, hsl(340 80% 65%), hsl(45 100% 70%))" }}
              initial={{ width: "0%" }}
              animate={{ width: `${((COUNTDOWN_FROM - count) / COUNTDOWN_FROM) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>

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
