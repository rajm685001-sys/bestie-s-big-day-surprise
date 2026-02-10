import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "./Confetti";
import cakeImg from "@/assets/cake-illustration.jpg";

const CANDLE_COUNT = 25;

const Candle = ({ x, lit, onBlow }: { x: number; lit: boolean; onBlow: () => void }) => (
  <div className="absolute" style={{ left: `${x}%`, bottom: "100%", transform: "translateX(-50%)" }}>
    <div className="w-1.5 h-8 bg-accent mx-auto rounded-sm" />
    <AnimatePresence>
      {lit && (
        <motion.div
          className="absolute -top-5 left-1/2 -translate-x-1/2 cursor-pointer"
          onClick={onBlow}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div
            className="w-3 h-5 rounded-full animate-flame"
            style={{
              background: "linear-gradient(to top, hsl(30 100% 50%), hsl(45 100% 70%), hsl(45 100% 90%))",
              animationDelay: `${Math.random() * 0.5}s`,
              filter: "blur(0.5px)",
            }}
          />
          <div
            className="absolute inset-0 w-3 h-5 rounded-full opacity-50"
            style={{
              background: "radial-gradient(circle, hsl(45 100% 90% / 0.6), transparent)",
              filter: "blur(4px)",
              transform: "scale(2)",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const cakeRevealLayers = [
  { emoji: "😂", text: "A funny meme of us — you know the one!", bg: "bg-accent/30" },
  { emoji: "🎟️", text: "Coupon: Free bestie adventure with Manyuuuuuu!", bg: "bg-secondary/50" },
  { emoji: "💖", text: "You're my forever fave, Manyuuuuuu 💖", bg: "bg-primary/20" },
];

const CakeCeremony = () => {
  const [phase, setPhase] = useState<"waiting" | "spotlight" | "cutting" | "cut" | "reveal">("waiting");
  const [candlesLit, setCandlesLit] = useState<boolean[]>(Array(CANDLE_COUNT).fill(true));
  const [showConfetti, setShowConfetti] = useState(false);
  const [shaking, setShaking] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const allBlownOut = candlesLit.every((c) => !c);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && phase === "waiting") {
          setPhase("spotlight");
        }
      },
      { threshold: 0.5 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, [phase]);

  const blowCandle = (i: number) => {
    setCandlesLit((prev) => {
      const next = [...prev];
      next[i] = false;
      return next;
    });
  };

  const blowAll = () => setCandlesLit(Array(CANDLE_COUNT).fill(false));

  const cutCake = () => {
    setPhase("cutting");
    setTimeout(() => {
      setPhase("cut");
      setShowConfetti(true);
      setShaking(true);
      setTimeout(() => setShaking(false), 500);
      setTimeout(() => {
        setPhase("reveal");
        setShowConfetti(false);
      }, 2000);
    }, 900);
  };

  const replay = () => {
    setPhase("waiting");
    setCandlesLit(Array(CANDLE_COUNT).fill(true));
    setShowConfetti(false);
    setTimeout(() => setPhase("spotlight"), 300);
  };

  const candlePositions = Array.from({ length: CANDLE_COUNT }, (_, i) => 5 + (i * 90) / (CANDLE_COUNT - 1));

  return (
    <>
      <Confetti active={showConfetti} count={80} />

      <AnimatePresence>
        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
            {Array.from({ length: 12 }, (_, i) => (
              <motion.div
                key={i}
                className="absolute text-4xl animate-balloon"
                style={{
                  left: `${Math.random() * 90}%`,
                  bottom: -50,
                  animationDelay: `${Math.random() * 1}s`,
                  animationDuration: `${4 + Math.random() * 3}s`,
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                🎈
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      <section
        ref={sectionRef}
        className={`relative min-h-screen flex flex-col items-center justify-center py-20 px-4 transition-colors duration-1000 ${
          phase !== "waiting" ? "bg-foreground/95" : "bg-muted"
        } ${shaking ? "animate-shake" : ""}`}
      >
        <motion.h2
          className={`text-4xl md:text-5xl font-display text-center mb-12 ${
            phase !== "waiting" ? "text-primary-foreground" : "text-primary"
          }`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          The Moment You've Waited For... 🎉
        </motion.h2>

        <div className="relative">
          {phase === "spotlight" && (
            <div
              className="absolute -inset-20 rounded-full opacity-20"
              style={{ background: "radial-gradient(circle, hsl(45 100% 80%), transparent 70%)" }}
            />
          )}

          <motion.div className="relative">
            {/* Candles */}
            <div className="relative w-64 md:w-80 h-0">
              {candlePositions.map((x, i) => (
                <Candle key={i} x={x} lit={candlesLit[i]} onBlow={() => blowCandle(i)} />
              ))}
            </div>

            {/* Cake image */}
            <AnimatePresence>
              {phase !== "reveal" && (
                <div className="relative">
                  <motion.img
                    src={cakeImg}
                    alt="Birthday cake"
                    className="w-64 md:w-80 h-auto rounded-2xl shadow-2xl"
                    animate={phase === "cut" ? { scale: [1, 1.05, 0.95, 1] } : {}}
                    transition={{ duration: 0.5 }}
                  />
                  <div className="w-72 md:w-96 h-4 mx-auto rounded-full bg-card border-2 border-border shadow-lg mt-2" />
                </div>
              )}
            </AnimatePresence>

            {phase === "cutting" && (
              <div className="absolute left-1/2 -translate-x-1/2 top-0 animate-knife z-20">
                <div className="text-5xl">🔪</div>
              </div>
            )}
          </motion.div>
        </div>

        {phase === "spotlight" && !allBlownOut && (
          <motion.div className="mt-8 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            <p className="font-handwritten text-xl text-primary-foreground/80 mb-3">
              Click the candles to blow them out! 🌬️
            </p>
            <button onClick={blowAll} className="btn-party text-sm px-4 py-2">
              Blow All Out! 💨
            </button>
          </motion.div>
        )}

        {phase === "spotlight" && allBlownOut && (
          <motion.div className="mt-10" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", damping: 8 }}>
            <button onClick={cutCake} className="btn-party text-2xl animate-bounce-soft">
              CUT THE CAKE! 🗡️
            </button>
          </motion.div>
        )}

        {phase === "reveal" && (
          <motion.div className="mt-8 space-y-4 max-w-md w-full" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <p className="font-display text-2xl text-primary-foreground text-center mb-6">
              Look what was inside! 🎁
            </p>
            {cakeRevealLayers.map((layer, i) => (
              <motion.div
                key={i}
                className={`scrapbook-card ${layer.bg}`}
                style={{ transform: `rotate(${(i - 1) * 2}deg)` }}
                initial={{ scale: 0, rotate: -10 }}
                animate={{ scale: 1, rotate: (i - 1) * 2 }}
                transition={{ delay: i * 0.3 }}
              >
                <div className="text-center">
                  <span className="text-4xl">{layer.emoji}</span>
                  <p className="font-handwritten text-xl mt-2">{layer.text}</p>
                </div>
              </motion.div>
            ))}

            <motion.div className="text-center mt-8" animate={{ rotate: [-3, 3, -3] }} transition={{ repeat: Infinity, duration: 1 }}>
              <span className="text-6xl cursor-pointer inline-block hover:scale-125 transition-transform">🍰</span>
              <p className="font-handwritten text-lg text-primary-foreground/70 mt-2">Hover to eat! 😋</p>
            </motion.div>
          </motion.div>
        )}

        {(phase === "cut" || phase === "reveal") && (
          <motion.button className="mt-12 btn-party" onClick={replay} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
            Replay Cake Magic ✨
          </motion.button>
        )}
      </section>
    </>
  );
};

export default CakeCeremony;
