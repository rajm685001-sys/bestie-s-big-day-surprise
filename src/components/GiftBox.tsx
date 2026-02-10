import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import giftBoxImg from "@/assets/gift-box.jpg";
import Confetti from "./Confetti";

const surprises = [
  { emoji: "🎉", message: "You are the BEST person I know, Manyuuuuuu!", color: "bg-primary/20" },
  { emoji: "🌟", message: "Here's a virtual hug that lasts forever! 🤗", color: "bg-accent/30" },
  { emoji: "💝", message: "Coupon: One free 'I'll do whatever you say' day!", color: "bg-secondary/50" },
];

const GiftBox = () => {
  const [opened, setOpened] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const openGift = () => {
    if (opened) return;
    setOpened(true);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  const reset = () => {
    setOpened(false);
  };

  return (
    <section className="py-20 px-4 bg-muted/50">
      <Confetti active={showConfetti} count={50} />

      <div className="max-w-2xl mx-auto text-center">
        <motion.h2
          className="text-4xl md:text-5xl font-display text-primary mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          A Special Gift For You 🎁
        </motion.h2>
        <p className="font-handwritten text-xl text-muted-foreground mb-10">
          Tap to unwrap your surprise!
        </p>

        <div className="relative inline-block">
          <AnimatePresence mode="wait">
            {!opened ? (
              <motion.div
                key="closed"
                className="cursor-pointer"
                onClick={openGift}
                whileHover={{ scale: 1.05, rotate: [0, -3, 3, 0] }}
                whileTap={{ scale: 0.95 }}
                exit={{
                  scale: 1.3,
                  opacity: 0,
                  rotateY: 90,
                  transition: { duration: 0.5 },
                }}
              >
                <img
                  src={giftBoxImg}
                  alt="Gift box"
                  className="w-48 h-48 md:w-64 md:h-64 object-contain mx-auto drop-shadow-xl"
                />
                <motion.p
                  className="font-handwritten text-lg text-muted-foreground mt-4"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  Tap me! 👆✨
                </motion.p>
              </motion.div>
            ) : (
              <motion.div
                key="opened"
                className="space-y-4"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", damping: 12 }}
              >
                <motion.div className="text-7xl mb-6" animate={{ rotate: [0, 10, -10, 0] }} transition={{ repeat: 2, duration: 0.5 }}>
                  🎊
                </motion.div>

                {surprises.map((s, i) => (
                  <motion.div
                    key={i}
                    className={`scrapbook-card ${s.color}`}
                    style={{ transform: `rotate(${(i - 1) * 2}deg)` }}
                    initial={{ x: i % 2 === 0 ? -100 : 100, opacity: 0, rotate: -20 }}
                    animate={{ x: 0, opacity: 1, rotate: (i - 1) * 2 }}
                    transition={{ delay: i * 0.3, type: "spring" }}
                  >
                    <span className="text-3xl">{s.emoji}</span>
                    <p className="font-handwritten text-xl mt-2">{s.message}</p>
                  </motion.div>
                ))}

                <motion.button
                  className="btn-party mt-6"
                  onClick={reset}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                >
                  Wrap it again! 🎁
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default GiftBox;
